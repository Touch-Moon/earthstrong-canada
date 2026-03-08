# Earthstrong Canada — 디자인 노트

> 작성일: 2026-03-08
> 참조 사이트: generousbranding.com (레이아웃/인터랙션 복제)
> 클라이언트: Earthstrong Canada (농업 작물 영양/토양 분석)

---

## 색상 시스템

| 토큰 | Hex | 용도 |
|------|-----|------|
| `$c-green` (brand-green) | `#2D5A27` | 로고, CTA 버튼, 주요 강조 |
| `$c-teal` (brand-teal) | `#7EBEC5` | 링크 hover, 보조 액센트 |
| `$c-cream` (brand-cream) | `#EFE9E7` | Manifesto 섹션 배경, 밝은 섹션 |
| `$c-dark` (brand-dark) | `#1a1a1a` | Footer, Marquee, 어두운 섹션 |
| `$c-charcoal` | `#333333` | 본문 텍스트 |
| `$c-white` | `#FFFFFF` | 기본 배경 |
| `$c-orange` (brand-orange) | `#E87A2E` | SCROLL 배지 화살표, 포인트 컬러 |

> 색상 이름은 SCSS 변수(`$c-*`)로 관리.
> 원본 generousbranding.com은 검정+크림 베이스. Earthstrong은 초록을 주조색으로 변경.

---

## 타이포그래피

### 폰트 패밀리

| 용도 | 폰트 | 특성 |
|------|------|------|
| 헤딩 (h1~h3) | **Vollkorn** (Serif) | Google Fonts, 700 weight, 우아한 농업 브랜드 느낌 |
| 본문/UI | **Figtree** (Sans-serif) | Google Fonts, Variable (300~900), 원본의 Telegraf(유료)와 유사 |

> ⚠️ 폰트 변경 이력: Poppins → Figtree (2026-03-07)
> Figtree는 Geometric sans-serif 계열. Telegraf보다 친근하고 가독성 높음.

### 크기 체계

| 역할 | 데스크톱 | 태블릿 | 모바일 |
|------|--------|--------|--------|
| H1 (히어로) | 96px | 64px | 36px |
| H2 (섹션) | 56px | 42px | 28px |
| H3 (카드) | 32px | 26px | 22px |
| 본문 | 18px | 16px | 16px |
| 본문 소 | 14px | 14px | 13px |
| 내비게이션 | 14px | 14px | 14px |
| 버튼 | 14px uppercase, letter-spacing 0.1em | | |

---

## 스페이싱 시스템

```scss
// 컨테이너
max-width: 1440px
padding: 0 24px (모바일) → 0 48px (태블릿) → 0 80px (데스크톱)

// 섹션 수직 패딩
py-20 md:py-32 lg:py-40

// 카드 간격
gap: 24px (모바일) → 32px (태블릿)

// 컴포넌트 내부
gap: 16px (기본)
```

---

## 버튼 스타일

### Outline 버튼 (기본 CTA)
```scss
border-radius: 9999px;    // pill 형태
border: 1px solid #1a1a1a;
padding: 12px 28px;
font: Figtree 600, 14px, uppercase;
letter-spacing: 0.1em;
// hover: 배경색 채움
```

### Filled 버튼 (강조 CTA)
```scss
background: #2D5A27;  // brand-green
color: #FFFFFF;
border-radius: 9999px;
```

---

## 이미지 처리

- **카드 이미지**: `border-radius: 0` (라운딩 없음, 날카로운 사각형)
- **Hover 효과**: `transform: scale(1.05)`, `transition: 500ms`, 부모 `overflow: hidden`
- **히어로 이미지**: 풀스크린, `object-fit: cover`
- **어두운 오버레이**: `background: linear-gradient(to top, rgba(0,0,0,0.5), transparent)`

---

## 히어로 도트 페이지네이션 스타일 (generousbranding.com 동일)

| 속성 | 비활성 도트 | 활성 도트 |
|------|-----------|---------|
| width | 10px | 48px |
| height | 10px | 10px |
| border-radius | 9999px | 9999px |
| 배경 | rgba(255,255,255,0.4) | 흰색 (fill) |
| 전환 | `width 0.35s cubic-bezier(0.4, 0, 0.2, 1)` | |

**fill 구조 (overflow:hidden 클리핑)**:
```html
<button class="es-hero__dot es-hero__dot--active">
  <span class="es-hero__dot-track">   ← overflow: hidden
    <span class="es-hero__dot-fill">  ← scaleX: 0→1 (GSAP)
    </span>
  </span>
</button>
```

---

## 애니메이션 시스템

### Text Reveal (clipPath)
```scss
// 적용: ManifestoSection, VisionHero, MissionStatement
clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)
duration: 1.2s
ease: power4.out
ScrollTrigger: start "top 85%"
```

### Fade Up
```scss
// 적용: 카드, 그리드 아이템
y: 60px → 0, opacity: 0 → 1
duration: 1s
stagger: 0.15s
ease: power3.out
```

### Parallax
```scss
// 적용: 대형 이미지 섹션
scrub: true
y: 0 → speed * 100
```

### 히어로 슬라이더
```scss
// 인트로 (약 1.7초)
이미지 fade-in: 1.35s
타이틀 단어: yPercent 100→0, stagger 0.08s, 1.2s, power2.inOut
서브타이틀: yPercent 10→0, 0.5s
도트: y 8px→0, stagger 0.1s, 0.8s
```

### 마키 (PartnerMarquee)
```scss
// CSS @keyframes, GSAP 불필요
animation: es-marquee 30s linear infinite
// hover 시 일시정지
&:hover { animation-play-state: paused }
// 콘텐츠 2배 반복 → translateX(-50%) 끝에서 원점 복귀
```

### SCROLL 배지
```scss
animation: es-spin 15s linear infinite
// SVG 원형 path에 텍스트 배치
```

---

## Header 동작

- **초기 상태**: `background: transparent`, `color: white`
- **스크롤 후**: `background: white`, `box-shadow: sm`, `color: dark`
- **전환**: CSS transition 0.3s
- **로고**: 스크롤 전 흰색 버전, 스크롤 후 컬러 버전 (또는 믹스블렌드 처리)
- **모바일**: 햄버거 → 풀스크린 오버레이 메뉴

---

## 섹션별 배경 패턴

| 섹션 | 배경 |
|------|------|
| HeroSlider | 이미지 + 어두운 그라디언트 |
| ManifestoSection | `$c-cream` (따뜻한 크림색) |
| FeaturedProduct | `$c-white` |
| ProductGrid | `$c-white` |
| SmallProductCards | `$c-white` |
| PartnerMarquee | `$c-dark` (어두운 배경 + 흰 텍스트) |
| Footer | `$c-dark` |

---

## SCSS BEM 클래스 네이밍 예시

```scss
// 히어로 슬라이더
.es-hero { }
.es-hero__media { }
.es-hero__overlay { }
.es-hero__content { }
.es-hero__title { }
.es-hero__word { }          // 단어별 split (stagger 애니메이션용)
.es-hero__subtitle { }
.es-hero__dots { }
.es-hero__dots-row { }
.es-hero__dot { }
.es-hero__dot--active { }   // 활성 도트
.es-hero__dot-track { }
.es-hero__dot-fill { }
.es-hero__badge { }

// 헤더
.es-header { }
.es-header--scrolled { }    // 스크롤 후 상태
.es-header__logo { }
.es-header__nav { }
.es-header__hamburger { }
```

---

## 원본 사이트(generousbranding.com) 분석 메모

### 분석한 것들
- 히어로 도트: 10px 원형 / 48px 필, border-radius 9999px, rgba(255,255,255,0.56)
- 슬라이드 전환 타이밍: xPercent로 이미지 이동, 단어 단위 stagger reveal
- 마키: 파트너 이름 + `+` 구분자, hover 정지
- SCROLL 배지: SVG 원형, 회전 애니메이션, 화살표 아이콘
- 헤더: 고정(fixed), 스크롤 시 배경 전환
- 페이지 전환: 커튼 애니메이션 (검은 마스크 위아래)

### 원본과 다른 점 (Earthstrong 커스터마이징)
- 색상: 검정/크림 → 초록(#2D5A27)/크림
- 폰트: Telegraf(유료) → Figtree(무료, 유사 느낌)
- 콘텐츠: 에이전시 포트폴리오 → 농업 제품/솔루션
- 메뉴: Work/Vision/Agence/Contact → Nutrition/Vision/About/Contact + Login
- 슬라이드 이미지: 플레이스홀더 + 실제 농경지 이미지
