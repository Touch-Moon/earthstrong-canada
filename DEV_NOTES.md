# Earthstrong Canada — 개발 노트

> 작성일: 2026-03-08
> 프로젝트: generousbranding.com 레이아웃 복제 → Earthstrong Canada 콘텐츠 적용

---

## 기술 스택

| 항목 | 버전 | 비고 |
|------|------|------|
| Next.js | 15 (App Router) | Turbopack 빌드 |
| TypeScript | 5.x | strict 모드 |
| SCSS | Dart Sass | BEM + `es-` 네임스페이스 |
| GSAP | 3.x | `@gsap/react` 훅 사용 |
| Lenis | 최신 | 스무스 스크롤 |
| Tailwind CSS | v4 | Tailwind는 최소한으로만 사용 (SCSS 주력) |
| Vercel | - | GitHub 연동 자동 배포 |

---

## 프로젝트 구조

```
src/
  app/           # Next.js App Router 페이지
  components/
    layout/      # Header, Footer, PageLoader, LenisProvider, ScrollUpBadge
    home/        # HeroSlider, ManifestoSection, FeaturedProduct, ProductGrid, SmallProductCards, PartnerMarquee, ScrollBadge
    products/    # ProductCard, ProductFilterTabs, NextProduct
    nutrition/   # NutritionClient (products/[slug]와 동일 구조, 별도 라우트)
    vision/      # VisionHero, ServicePillars, ClientShowcase
    about/       # MissionStatement, TeamProfiles, TeamMember, ClientGrid
    shared/      # Button, Badge, SectionHeading, SubpageHero
  styles/        # SCSS 모듈 분리 (globals.scss가 @import로 결합)
  data/          # products.ts, team.ts, partners.ts, navigation.ts, site.ts
  lib/           # gsap-config.ts, utils.ts
  types/         # index.ts (Product, TeamMember, Partner 등 타입 정의)
```

---

## SCSS 구조 및 네이밍 규칙

- **네임스페이스**: 모든 클래스는 `es-` 프리픽스 (Earthstrong)
- **BEM**: `es-블록__엘리먼트--모디파이어`
- **파일 분리**: 섹션별로 `_home.scss`, `_layout.scss`, `_products.scss` 등 분리
- **결합**: `src/styles/globals.scss`에서 `@import`로 모두 불러옴

> ⚠️ Dart Sass 3.0에서 `@import` 폐지 예정. 빌드 경고는 발생하지만 에러는 아님.
> 향후 `@use`/`@forward` 방식으로 마이그레이션 권장.

---

## GSAP 설정

### `src/lib/gsap-config.ts`
```typescript
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
```
- `"use client"` 필수 (서버에서 GSAP 실행 불가)
- 모든 컴포넌트는 이 파일에서 `gsap`, `ScrollTrigger`를 import

### `useGSAP` 훅 사용 규칙
- `"use client"` 컴포넌트에서만 사용
- cleanup은 자동 (컨텍스트가 unmount 시 모든 tween 제거)
- `scope: ref` 지정으로 해당 DOM 내 요소만 선택 가능

### React Strict Mode 주의사항
개발 모드에서 React Strict Mode는 **컴포넌트를 2회 마운트**한다.
`useGSAP`의 cleanup이 첫 번째 마운트의 타임라인을 제거하므로,
두 번째 마운트 시 상태를 초기화하는 코드가 필요하다.

```typescript
useGSAP(() => {
  // Strict Mode 재마운트 시 플래그 초기화
  isAnimatingRef.current = false;
  if (progressTwRef.current) progressTwRef.current.kill();
  // ... 이하 애니메이션 코드
}, { scope: sectionRef });
```

---

## Lenis + GSAP ScrollTrigger 연동

`src/components/layout/LenisProvider.tsx`

```typescript
const ticker = (time: number) => {
  lenis.raf(time * 1000);  // GSAP ticker 시간(초) → ms 변환
};
gsap.ticker.add(ticker);
gsap.ticker.lagSmoothing(0);  // 탭 숨김 후 복귀 시 점프 방지
```

- **`lagSmoothing(0)`**: threshold=0ms. 탭 전환 후 복귀 시 큰 delta를 33ms로 캡핑.
  60fps 환경에서는 16.67ms < 33ms라 영향 없음. 정상 동작.
- LenisProvider는 `layout.tsx`에서 전체를 감싸는 형태로 사용.

---

## HeroSlider 구현

### 핵심 로직

```
인트로 타임라인 (약 1.7초 GSAP-time)
  └→ tl.call(startProgress(0))  ← 인트로 완료 후 1회 실행
       └→ gsap.fromTo(fill[0], { scaleX: 0 }, { scaleX: 1, duration: 5s })
            └→ onComplete: goTo(1)  ← 5초 후 다음 슬라이드
                 └→ 슬라이드 전환 타임라인 (약 1.7초)
                      └→ onComplete: startProgress(1)  ← 다음 도트 fill 시작
```

### 도트 (generousbranding.com 스타일)

| 상태 | 너비 | 높이 | border-radius |
|------|------|------|---------------|
| 비활성 | 10px | 10px | 9999px (원형) |
| 활성 | 48px | 10px | 9999px (필 형태) |

- **CSS 전환**: `transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1)`
- **활성 클래스**: `es-hero__dot--active` → `width: 48px`
- **fill 애니메이션**: GSAP `scaleX: 0→1`, `transform-origin: left`
- **fill 구조**: `button.es-hero__dot > span.es-hero__dot-track(overflow:hidden) > span.es-hero__dot-fill`

### 슬라이드 전환 타이밍 (generousbranding.com 추출)

```
t=0.0  나가는 이미지: opacity 1→0.2, xPercent 0→-10 (1.3s, power2.inOut)
t=0.0  나가는 텍스트 단어: opacity→0, yPercent→-30 (0.4s, power2.in)
t=0.1  들어오는 이미지: xPercent 100→0 (1.2s, power2.inOut)
t=0.8  들어오는 단어: yPercent 100→0, opacity 0→1 (1s, stagger 0.08)
t=1.2  들어오는 서브타이틀: opacity/yPercent (0.5s)
```

### forward ref 패턴 (stale closure 방지)

```typescript
const goToRef = useRef<(index: number) => void>(() => {});
const startProgressRef = useRef<(index: number) => void>(() => {});

// 렌더마다 최신 함수로 업데이트
goToRef.current = goTo;
startProgressRef.current = startProgress;
```
→ `useCallback` 내부의 클로저가 오래된 함수 참조를 갖지 않도록 방지.

---

## PageLoader 구현

2레이어 시스템:
- Layer 1 (`es-loader__bg`, z-99): 흰 배경, opacity 페이드
- Layer 2 (`es-loader__mask`, z-100): 검은 마스크, scaleY 커튼

### React Strict Mode 이슈
`useEffect`가 2회 실행되면서 `isFirstLoadRef.current`가 첫 실행에서 `false`로 바뀜.
두 번째 실행은 `playReveal(false)` (페이지 전환 애니메이션)을 호출.
→ **개발 모드에서만 발생**. 프로덕션 빌드에서는 정상 동작.

---

## 배포

### GitHub
- 리포지토리: `Touch-Moon/earthstrong-canada` (Private)
- URL: https://github.com/Touch-Moon/earthstrong-canada

### Vercel
- 프로젝트명: `earthstrong-canada`
- 계정: `buytouch-3796`
- 프로덕션 URL: https://earthstrong-canada.vercel.app
- 연동: GitHub `main` 브랜치 → 자동 배포

### 이후 배포 방법
```bash
git add -A
git commit -m "커밋 메시지"
git push  # → Vercel 자동 빌드 & 배포
```

---

## 디버깅 경험 (Claude Preview 툴 한계)

Claude Preview 도구는 내장 헤드리스 브라우저를 사용하며,
`requestAnimationFrame`이 약 **2fps**로 throttle됨.
GSAP 애니메이션이 정상 동작하는 것처럼 보이지 않을 수 있으나,
실제 브라우저(localhost:3000)에서는 60fps로 정상 동작함.

**증상**: fillScaleX가 오래 0에 머물다 갑자기 1.66%로 바뀜
**원인**: `lagSmoothing(0)` + 2fps RAF → GSAP가 33ms/frame 진행 → 매우 느린 애니메이션
**결론**: 코드 자체는 정상. Preview로 GSAP 애니메이션 검증 불가.

---

## 알려진 이슈 / 향후 개선사항

- [ ] SCSS `@import` → `@use`/`@forward` 마이그레이션 (Dart Sass 3.0 대비)
- [ ] PageLoader Strict Mode 이슈 (개발 환경에서만 발생, 프로덕션 정상)
- [ ] `/products/[slug]`와 `/nutrition/[slug]`가 동일 데이터를 두 라우트로 제공 중 → 통합 가능
- [ ] 실제 이미지 교체 시 `next/image` `sizes` 속성 최적화 필요
- [ ] 연락처 폼 실제 서버 연동 (현재 UI만)
- [ ] 로그인 기능 실제 인증 연동 (현재 UI만)
