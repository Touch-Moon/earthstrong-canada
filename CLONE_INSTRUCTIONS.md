# 사이트 복제 프로젝트 — AI 지시 가이드

> 다음에 새 사이트를 복제할 때 AI(Claude)에게 전달할 지시사항 모음
> Earthstrong Canada 프로젝트에서 얻은 경험 기반

---

## 1단계: 프로젝트 시작 전 AI에게 전달해야 할 정보

### 반드시 포함할 내용

```
아래 사항을 반드시 CLAUDE.md에 먼저 작성하고 AI에게 공유:

1. 복제할 원본 사이트 URL
2. 새 사이트의 회사명, 업종, 슬로건
3. 교체할 콘텐츠 (섹션별로 정확히)
4. 색상 팔레트 (Hex 코드 포함)
5. 폰트 선택 (Google Fonts 기준)
6. 페이지 구조 (내비게이션 항목 + URL)
7. 데이터 (제품/팀/파트너 등)
8. 보유 이미지 파일 목록 또는 다운로드 URL
```

### CLAUDE.md 작성 예시 (이번 프로젝트 구조 참고)

```markdown
## 프로젝트 개요
- 복제 원본: generousbranding.com
- 회사: [회사명]
- 업종: [업종]
- 슬로건: "[슬로건]"

## 기술 스택
- Next.js 15 (App Router, src/ directory)
- TypeScript
- SCSS (BEM, [prefix]- 네임스페이스)
- GSAP 3 + ScrollTrigger
- Lenis (스무스 스크롤)

## 색상
[토큰명]: [Hex] — [용도]

## 타이포그래피
헤딩: [폰트명] (Serif/Sans)
본문: [폰트명] (Sans)

## 페이지 구조
[메뉴명]: /[url] — 원본 [원본URL] 복제
```

---

## 2단계: 원본 사이트 분석 지시

### AI에게 요청할 것

```
"[원본 URL]에서 아래 항목들을 JavaScript로 DOM 분석해서 정확한 수치를 추출해라:

1. 헤더: 높이, 배경, 스크롤 후 변화
2. 히어로: 레이아웃, 텍스트 위치, 도트/인디케이터 스타일
3. 모든 도트/페이지네이션: width, height, border-radius, 색상
4. 버튼: padding, border-radius, font-size, letter-spacing
5. 카드: 이미지 비율, gap, hover 효과
6. 마키: 속도, 방향, 구분자
7. 슬라이드 전환: GSAP 타이밍, easing (DevTools Performance로 측정)
8. 폰트: font-family, font-weight, line-height (각 요소별)"
```

### 분석 방법 예시 (JavaScript)

```javascript
// 헤더 분석
const header = document.querySelector('header');
const cs = window.getComputedStyle(header);
console.log({
  height: header.getBoundingClientRect().height,
  background: cs.background,
  position: cs.position,
  zIndex: cs.zIndex
});

// 도트 분석
document.querySelectorAll('.dot-class').forEach(dot => {
  const r = dot.getBoundingClientRect();
  const s = window.getComputedStyle(dot);
  console.log({ width: r.width, height: r.height, borderRadius: s.borderRadius, background: s.background });
});
```

---

## 3단계: 프로젝트 초기화 지시

### AI에게 전달할 명령어 순서

```
1. "아래 명령어로 프로젝트를 초기화해라:
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias '@/*'
   npm install gsap @gsap/react lenis sass"

2. "다음 디렉토리 구조를 만들어라:
   src/components/layout/
   src/components/home/
   src/components/shared/
   src/styles/
   src/data/
   src/lib/
   src/types/
   public/images/{logo,hero,products,backgrounds,partners,team}/"

3. "이미지들을 아래 URL에서 다운로드해라:
   [URL 목록]"
```

---

## 4단계: 빌드 순서 (반드시 이 순서로 지시)

> 순서를 지키지 않으면 import 오류 발생. 의존성 있는 파일을 먼저 만들어야 함.

```
1. SCSS 기반: _variables.scss, _mixins.scss, _reset.scss, _base.scss
2. 타입: src/types/index.ts
3. 데이터: src/data/*.ts (products, team, partners, navigation, site)
4. 유틸: src/lib/gsap-config.ts, src/lib/utils.ts
5. 루트 레이아웃: src/app/layout.tsx (폰트, 메타데이터, Provider 설정)
6. 글로벌 스타일: src/styles/globals.scss (@import 모두 결합)
7. 공유 컴포넌트: src/components/shared/ (Button, Badge, SectionHeading)
8. 레이아웃 컴포넌트: Header, Footer, PageLoader, LenisProvider
9. 홈페이지 섹션 (위→아래 순서대로):
   - HeroSlider
   - ManifestoSection
   - FeaturedProduct
   - ProductGrid
   - SmallProductCards
   - PartnerMarquee
10. src/app/page.tsx (홈 조립)
11. 서브 페이지: /products, /vision, /about, /contact, /login, /legal
12. 동적 라우트: /products/[slug]
13. not-found.tsx
```

---

## 5단계: 컴포넌트별 핵심 지시사항

### HeroSlider

```
"HeroSlider를 만들 때 반드시 지켜야 할 사항:
1. isAnimatingRef로 전환 중 중복 실행 방지
2. goToRef, startProgressRef로 stale closure 방지 (forward ref 패턴)
3. useGSAP 시작 시 isAnimatingRef.current = false로 초기화 (Strict Mode 대응)
4. 도트 fill: GSAP scaleX 0→1, transform-origin: left, overflow:hidden 부모
5. 도트 너비 전환: GSAP 아닌 CSS transition으로 처리 (더 안정적)"
```

### PageLoader

```
"PageLoader를 만들 때:
1. useEffect (useGSAP 아님) 사용
2. isFirstLoadRef로 초기 로드/페이지 전환 구분
3. 2레이어: 검은 마스크(z-100, scaleY 커튼) + 흰 배경(z-99, opacity 페이드)
4. usePathname 변화 감지로 페이지 전환 시 자동 실행
5. onComplete에서 display:'none' 처리 (DOM에서 레이어 제거)"
```

### 애니메이션 (ScrollTrigger)

```
"ScrollTrigger 사용 컴포넌트는 반드시:
1. 'use client' 선언
2. gsap-config.ts에서 import (registerPlugin 이미 완료된 파일)
3. useGSAP 훅 + scope: ref 지정
4. ScrollTrigger.refresh() 는 라우트 변경 시 호출"
```

### 마키 (Marquee)

```
"마키 컴포넌트:
1. CSS @keyframes로 구현 (GSAP 불필요)
2. 콘텐츠를 정확히 2번 반복 → translateX(-50%)로 루프
3. hover 시 animation-play-state: paused
4. 속도: 30s linear infinite (조정 가능)"
```

---

## 6단계: 자주 발생하는 오류 및 해결법

### "Cannot find module" 오류
```
원인: 파일 생성 순서 문제 또는 import 경로 오류
해결: "@/*" alias 확인, tsconfig.json의 paths 설정 확인
```

### GSAP 애니메이션이 서버에서 실행 오류
```
원인: GSAP는 브라우저 전용
해결: "use client" 추가, gsap-config.ts도 "use client" 필요
```

### ScrollTrigger가 동작 안 함
```
원인: registerPlugin 누락, 또는 Lenis와 연동 안 됨
해결: gsap-config.ts에서 registerPlugin(ScrollTrigger),
      LenisProvider에서 lenis.on('scroll', ScrollTrigger.update)
```

### Strict Mode에서 애니메이션 이상 동작
```
원인: useEffect/useGSAP가 2회 실행
해결: useGSAP 내 시작 시 ref.current = false 초기화,
      useEffect cleanup에서 tween.kill()
```

### next/image 도메인 오류
```
원인: 외부 이미지 도메인 허용 안 됨
해결: next.config.ts에 images.remotePatterns 추가
      또는 이미지를 public/ 폴더에 직접 다운로드
```

---

## 7단계: 배포 체크리스트

### Git & GitHub
```bash
git init
git add -A
git commit -m "Initial commit: [프로젝트명]"
git branch -m main
gh repo create [repo-name] --private --source . --remote origin --push
```

### Vercel
```bash
vercel --prod --yes
# 또는 GitHub 연동 후 자동 배포
```

### 배포 전 체크
- [ ] `npm run build` 로컬에서 에러 없이 통과
- [ ] 모든 라우트 접근 가능 확인
- [ ] 이미지 경로 오류 없음 (`next/image` alt 속성 포함)
- [ ] 환경변수 `.env.local` → Vercel 대시보드에 등록
- [ ] `next.config.ts` 외부 이미지 도메인 설정

---

## 8단계: 후속 수정 워크플로우

```bash
# 코드 수정 후
git add -A
git commit -m "fix: [수정 내용]"
git push
# → Vercel 자동 빌드 & 배포 (약 1-2분 소요)
```

---

## 자주 쓰는 AI 지시 패턴

### 원본 사이트 분석
```
"[URL]에서 [요소]의 CSS 속성을 JavaScript getComputedStyle로 정확히 추출해라.
수치는 반올림 없이 정확한 픽셀 값을 보고해라."
```

### 컴포넌트 생성
```
"[컴포넌트명]을 만들어라. 조건:
- SCSS BEM 클래스 (es- 프리픽스)
- TypeScript strict 모드
- 'use client' 필요 여부 판단
- GSAP 사용 시 useGSAP 훅 + gsap-config.ts에서 import
- 모바일 반응형 (375px / 768px / 1280px 브레이크포인트)"
```

### 스타일 수정
```
"[원본 URL]의 [요소]와 정확히 동일한 스타일을 적용해라.
차이가 있으면 JavaScript로 원본을 직접 측정해서 맞춰라."
```

### 디버깅
```
"[현상]이 발생하고 있다.
원인을 찾기 위해 DOM 상태, GSAP tween 상태, CSS computed style을
JavaScript eval로 직접 확인해라. 추측하지 말고 측정값으로 판단해라."
```

---

## 참고: 이번 프로젝트(Earthstrong)에서 배운 것

1. **원본 사이트 수치는 반드시 직접 측정** - 눈대중으로 하면 틀림
2. **도트 같은 디테일은 픽셀 단위로 맞춰야** 브랜드 퀄리티 나옴
3. **GSAP vs CSS**: 단순한 너비/색상 변화는 CSS transition이 더 안정적
4. **preview 툴은 GSAP 검증에 한계** - 반드시 실제 브라우저로 확인
5. **Strict Mode 이슈는 개발에서만** - 프로덕션 빌드하면 사라짐
6. **SCSS @import 경고는 에러 아님** - 빌드는 정상
7. **이미지는 public/ 직접 저장이 안전** - 외부 URL은 next.config 설정 필요
8. **forward ref 패턴** (goToRef, startProgressRef)으로 stale closure 반드시 방지
