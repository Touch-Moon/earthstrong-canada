# generousbranding.com 정밀 조사 노트

> **조사일**: 2026-03-07
> **목적**: Earthstrong Canada 사이트 레이아웃/인터랙션 복제를 위한 원본 사이트 분석
> **원본**: https://generousbranding.com/
> **대상**: https://strongterra.com/ (Earthstrong Canada)

---

## 1. 기술 스택 (원본)

| 항목 | 사용 기술 |
|------|----------|
| **애니메이션 프레임워크** | **Luge.js** (`npm-luge.js`) — data attribute 기반 reveal/scroll/parallax |
| **보조 애니메이션** | JS 기반 커스텀 (GSAP는 window에 로드되지 않음, `window.gsap = false`) |
| **스무스 스크롤** | **Lenis** (HTML에 `lenis lenis-smooth` 클래스) |
| **번들러/프레임워크** | WordPress 커스텀 테마 (`generous-theme`) |
| **기타 스크립트** | `front.min.js`, `main.js` |
| **CSS 방식** | 커스텀 CSS, BEM 네이밍 (`s-`, `b-`, `a-`, `u-` 접두사) |

### CSS 클래스 네이밍 컨벤션
- `s-` : Section (s-hero-slider, s-manifesto, s-featured-projects)
- `b-` : Block/Component (b-project-card, b__line, b__cover)
- `a-` : Atom/Animation (a-scroll, a-svg, a-picto)
- `u-` : Utility (u-container, u-sr-only)
- `sb-` : Sub-block (sb-slide, sb-marquee, sb__content)
- 상태: `is-loaded`, `is-playing`, `is-active`, `is-in`, `is-out`, `is-past`

---

## 2. 폰트 상세

### PP Telegraf (커스텀 폰트)
- **소스**: 자체 호스팅 woff2 (`PPTelegraf-Regular.woff2`, `PPTelegraf-Light.woff2`)
- **Weight 2개만 사용**: Light (300), Regular (400) — Bold(700)는 CSS font-weight로만 적용
- **단일 폰트 체계** — 세리프/산세리프 구분 없이 하나로 통일

### 타이포그래피 스케일 (Desktop 1470px 기준)

| 용도 | Size | Weight | Line-Height | Letter-Spacing | Text-Transform |
|------|------|--------|-------------|----------------|----------------|
| Hero 슬라이드 제목 | **116.667px** | 300 (Light) | 110.833px (0.95em) | 0.8px | none |
| "Work" 마키 제목 | **316.66px** | 400 | 316.66px (1.0em) | 0.8px | none |
| Manifesto H2 (SVG) | 50px | 700 | 52.8px (1.056em) | 0.8px | none |
| Manifesto 본문 | 50px | 400 | 52.8px | 0.8px | none |
| Footer 이메일 (대형) | **91.667px** | 400 | 88px (0.96em) | 0.8px | none |
| Hero 서브타이틀 | 21.667px | 300 | - | 0.8px | none |
| Body 기본 | 20px | 400 | 29.2px (1.46em) | 0.8px | none |
| Footer 라벨 | 16.667px | 600 | - | 0.8px | none |
| Footer 링크/전화 | 16.667px | 400 | - | 0.8px | none |
| CTA 버튼 | 15.833px | 400 | - | **1.583px (0.1em)** | **uppercase** |
| Nav 링크 | **12.5px** | 400 | 18.25px | **1.875px (0.15em)** | **uppercase** |

### 핵심 포인트
1. **letter-spacing 0.8px가 전역 기본** — 거의 모든 텍스트에 적용
2. Nav과 CTA에서만 letter-spacing이 넓어짐 (0.1em~0.15em)
3. 대형 제목은 **weight 300 (Light)** — 가볍고 우아한 느낌
4. Bold(700)는 Manifesto H2와 같은 강조 텍스트에만 사용
5. 모든 폰트 사이즈가 **vw 기반일 가능성** (116.667px = 비정수)

---

## 3. 레이아웃 · 스페이싱

### 글로벌 컨테이너 (`.u-container`)

```
max-width: 1520px
margin-left: 40px
margin-right: 40px
padding: 0
```

→ **컨테이너 자체에 padding 없음, margin으로 사이드 여백 확보**
→ 뷰포트 1600px 이하에서는 좌우 40px 마진만 남음
→ 뷰포트 1600px 이상에서는 1520px 중앙 정렬

### 섹션 간격 (margin 기반, padding 아님!)

| 섹션 전환 | 간격 | 방식 |
|-----------|------|------|
| Hero → Manifesto | **~190px** | Hero margin-bottom 83px + Manifesto margin-top 108px |
| Manifesto → Featured | **108px** | Manifesto margin-bottom |
| Featured → Footer Marquee | 0 | 연속 |
| Marquee → Footer | 0 | 연속 |

**주의**: 원본은 `padding`이 아닌 `margin`으로 섹션 간격을 조절함.
margin collapse가 발생하므로 실제 간격은 max(top, bottom) = 약 108px.

### Hero Slider 내부 배치

```
┌─────────────────────────────────────────────────────────────┐
│ (fullscreen, 100vh, position: relative)                      │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                          [slide image]                        │
│                       (position: absolute, inset: 0)         │
│                                                              │
│                                                              │
│                                                              │
│  ┌── content (abs, bottom: 80px, left: 40px) ──┐            │
│  │  Title (116.667px, weight 300)               │   [SCROLL] │
│  │  Subtitle (21.667px, weight 300)             │  badge     │
│  └──────────────────────────────────────────────┘  (abs,     │
│  ● ● ● ● ● ▬▬ ● ● (abs, bottom: 60px, left: 40px)  b:80px │
│                                                     r:40px)  │
└─────────────────────────────────────────────────────────────┘
```

### Dot Pagination 상세
- **형태**: 사각형 (border-radius: 0) — 원형이 아님!
- 크기: 10px × 10px (일반) / **48px × 10px (활성 — 가로 확장!)**
- 간격: margin-right 14px
- 총 9개 dot (슬라이드 수와 동일)
- **Transition**: `width 0.4s cubic-bezier(1, 0, 0, 1)` (활성 전환 시 width 애니메이션)
- Active dot은 가로로 "dash" 형태로 늘어남
- 색상: `::before` pseudo-element로 표현 (24px × 32px 히트 영역)
- cursor: pointer

### 프로젝트 카드 그리드

**레이아웃 방식**: `display: flex; flex-wrap: wrap` (CSS Grid 아님!)

```
Row 1: [========== 2XL (100%, 1390px) ==========]
Row 2: [==== LG (49.2%, 684px) ====][=== MD (40.7%, 566px) ===]
Row 3: [= SM (32.2%, 448px) =][= SM (32.2%) =][= SM (32.2%) =]
Row 4: [= SM (32.2%) =][==== LG (49.2%) ====]  ← 비대칭 반복
```

| 카드 사이즈 | 너비 | 높이 | 이미지 비율 |
|------------|------|------|------------|
| **2XL** (풀폭) | 1390px (100%) | 689px | 4:3 (1.33) |
| **LG** | 684px (~49.2%) | 673px | 4:3 |
| **MD** | 566px (~40.7%) | 650px | 4:3 |
| **SM** | 448px (~32.2%) | 410~518px | 4:3 |

- **카드 간 수평 갭**: 약 22px (flex justify로 자동 분배)
- **카드 간 수직 갭**: 자동 (flex-wrap 특성)
- **2XL 카드 구조**: `display: flex; flex-direction: row` — 텍스트(330px, ~24%) + 이미지(919px, ~66%)
- **LG 카드**: 전체 너비, 이미지 위 + 텍스트 아래 (`display: inline`)
- **나머지 카드**: 이미지 위 + 텍스트 아래
- **이미지 aspect ratio**: 984:656 (약 3:2), object-fit: cover

### CTA 버튼 상세

```css
border-radius: 9999px;       /* pill shape */
border: 1px solid black;
background: transparent;
height: 37.8px;
font-size: 15.833px;
letter-spacing: 1.583px;     /* 0.1em */
text-transform: uppercase;
display: inline-flex;
align-items: center;
/* padding: 내부 요소로 조절 (직접 padding 아님) */
```

→ 화살표(→)가 버튼 내부에 포함, 호버 시 화살표 이동 애니메이션

### Footer 레이아웃

```
┌──────────────────────────────────────────────────────────────┐
│ [Footer Marquee — 프로젝트 이름 가로 스크롤, 대형 텍스트]      │
├──────────────────────────────────────────────────────────────┤
│ bg: #000000 (순수 블랙)                                       │
│                                                               │
│ Menu              Nous suivre                                 │
│ → Work   → Vision  ↗ Instagram  ↗ LinkedIn                   │
│ → L'Agence → Contact                                         │
│                                                               │
│ bonjour@                                                      │
│ generousbranding.com   (91.667px, weight 400)                │
│                                                               │
│ Adresse            Téléphone                [SCROLL UP badge] │
│ ↗ 50 Rue...        +33 1 42...                               │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│ → Mentions légales  → Cookies  ‣ Crédits   ©Generous        │
└──────────────────────────────────────────────────────────────┘
```

- **라벨 색상**: `rgb(118, 118, 118)` — 회색
- **링크/콘텐츠**: 흰색
- **이메일 margin**: top 50px, bottom 25px
- **Copyright bar**: 상단 border로 구분

---

## 4. 애니메이션 상세

### 4-1. 페이지 로드 시퀀스

```
1. HTML에 is-loaded 클래스 추가
2. Lenis smooth scroll 초기화 (lenis, lenis-smooth, has-smooth-scroll)
3. Hero slider is-loaded 상태
4. 첫 슬라이드 is-active (opacity: 1, z-index: 2)
5. 슬라이드 제목 word-by-word reveal:
   - 텍스트 → sb__title__line > sb__title__word 분할
   - 각 word: display: inline-block, will-change: opacity, transform
   - 순차적 translateY(100%) → translateY(0) + opacity 0→1
6. 서브타이틀 fade-in
7. Dot pagination 활성화
8. SCROLL badge 회전 시작
9. 슬라이더 auto-play 시작 (is-playing)
```

### 4-2. Hero Slider 전환

```
전환 방식: 즉시 opacity switch (crossfade가 아님!)
- active:   opacity: 1; z-index: 2; transition: opacity 0s linear 0.1s
- inactive: opacity: 0; z-index: 1; transition: opacity 0s linear 0.1s

제목 전환:
- 이전 제목 words: translateY 위로 사라짐
- 새 제목 words: translateY(100%) → translateY(0) 순차 등장
- will-change: opacity, transform
```

### 4-3. Manifesto 텍스트 애니메이션 ⭐ (가장 중요)

**"Spotlight" 효과 — Luge.js b__line 시스템**

```
구조:
<p>
  <div class="b__line is-in is-past">La marque au cœur de la</div>
  <div class="b__line is-in is-past">stratégie, de l'identité,</div>
  <div class="b__line is-in">du design • Pour</div>       ← 현재 읽는 위치 (진하게)
  <div class="b__line">Generous c'est la</div>             ← 아직 안 보임
  <div class="b__line">conjugaison de tous les</div>
</p>

상태별 opacity:
- 기본 (미도달): opacity: 0.06 (거의 안 보임, 연한 회색)
- is-in (진입): opacity: 1.0 (완전 진하게)
- is-past (지나감): opacity: 0.06 (다시 연해짐)

Transition:
  transform 1s cubic-bezier(0.86, 0, 0.07, 1),
  opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1)

핵심: 스크롤 위치에 따라 "읽고 있는 줄"만 진하게 표시
→ 시각적으로 "스포트라이트가 텍스트를 비추는" 효과
```

**구현 방법 (GSAP ScrollTrigger로 재현):**
1. 텍스트를 줄 단위로 분할 (CSS or JS)
2. ScrollTrigger scrub으로 각 줄의 opacity 제어
3. 0.06 → 1.0 → 0.06 삼단계 전환
4. 중앙 뷰포트 기준으로 "활성 줄" 결정

### 4-4. lg-reveal (Luge 기본 Reveal)

```css
/* 기본 상태 */
[data-lg-reveal], .lg-reveal {
  opacity: 0;
  will-change: opacity, transform;
}

/* 뷰포트 진입 */
.lg-reveal.is-in {
  opacity: 1;
}

/* Fade variant */
.lg-reveal--fade {
  transition: opacity 0.3s linear;
}

/* Fade-to-bottom (위에서 아래로) */
.lg-reveal--fade-to-bottom {
  transform: translateY(-30px);
  transition: opacity 0.6s, transform 0.6s;
}
.lg-reveal--fade-to-bottom.is-in {
  transform: translateY(0);
}
```

### 4-5. 이미지 Parallax

```
메커니즘: Luge data-lg-scroll + CSS custom property

- 이미지 컨테이너 (.b__cover)에 --progress CSS변수 실시간 주입
- --progress: 0 (화면 아래) → 1 (화면 위로 지나감)
- 이미지: scale(1.1) 고정 + translateY가 progress에 비례
- 예: matrix(1.1, 0, 0, 1.1, 0, -18.827)
  → scaleX=1.1, scaleY=1.1, translateY=-18.827px
- translateY 범위: 약 ±40px (스크롤 속도에 비례)
- overflow: hidden으로 확대 영역 클리핑

구현 (GSAP):
ScrollTrigger({
  trigger: imageContainer,
  start: "top bottom",
  end: "bottom top",
  scrub: true
});
gsap.fromTo(image,
  { yPercent: -5 },
  { yPercent: 5 }
);
// 이미지는 CSS로 scale(1.1) 고정 적용
```

### 4-6. 헤더 스크롤 동작

```
기본 상태 (Hero 위):
- position: fixed; top: 0
- background: transparent
- height: 58px
- nav links color: rgb(239, 239, 239) (오프화이트)
- class: site-head--white
- transition: height 0.6s cubic-bezier(0.19, 1, 0.22, 1)

스크롤 후 (Manifesto 영역):
- background: 여전히 transparent (배경색 전환 없음!)
- nav links color: rgb(0, 0, 0) (검정)
- class: site-head (--white 제거)
- 높이 변화 가능 (58px → 48px 등)

특이점: 배경색 전환 없이 텍스트 색상만 전환
→ 콘텐츠 배경이 밝으므로 검정 텍스트로 전환
```

### 4-7. SCROLL Badge

```
외곽 텍스트 회전:
  animation: a-scroll-rotate 20s linear infinite
  (0% → 360deg 무한 회전)

내부 화살표 바운스:
  animation: a-scroll-arrow
  0%:     translateY(0)       cubic-bezier(0.755, 0.05, 0.855, 0.06)
  50%:    translateY(180%)    linear
  50.01%: translateY(-180%)   cubic-bezier(0.23, 1, 0.32, 1)
  100%:   translateY(0)       linear

크기: 106 × 106px
위치: absolute, bottom: 80px, right: 40px (Hero 내부)
```

### 4-8. "Work" 마키 타이틀

```css
animation: s-marquee-title-slide var(--duration, 12s) linear infinite;

@keyframes s-marquee-title-slide {
  0%   { transform: translateX(-10%); }
  100% { transform: translateX(-110%); }
}

- 316.66px 크기의 "Work" 텍스트가 느리게 좌로 이동
- --duration CSS variable로 속도 제어
```

### 4-9. Footer 파트너 마키

```css
animation: site-foot-marquee-slide 35s linear infinite;

@keyframes site-foot-marquee-slide {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-100%, 0, 0); }
}

- 프로젝트 이름이 대형 텍스트로 가로 스크롤
- 35초에 한 바퀴 (느린 속도)
- display: inline-block; white-space: nowrap
- 텍스트 2배 복제로 무한 루프 구현
```

### 4-10. Smooth Scroll (Lenis)

```
HTML 클래스: lenis lenis-smooth has-smooth-scroll has-scrollbar
- 네이티브 스크롤바 유지 (has-scrollbar)
- 커스텀 easing으로 부드러운 스크롤
- 터치/마우스 휠 모두 대응
```

---

## 5. 색상 팔레트 (원본)

| 용도 | 색상 | Hex 추정 |
|------|------|----------|
| 텍스트 (기본) | rgb(0, 0, 0) | #000000 |
| Nav (Hero 위) | rgb(239, 239, 239) | #EFEFEF |
| Footer 라벨 | rgb(118, 118, 118) | #767676 |
| Footer 배경 | rgb(0, 0, 0) | #000000 |
| Footer 텍스트 | rgb(255, 255, 255) | #FFFFFF |
| 배경 (기본) | rgb(255, 255, 255) | #FFFFFF |
| Manifesto 미활성 텍스트 | opacity 0.06 (검정 + 투명) | #000 @ 6% |
| SCROLL badge 화살표 | 주황색 (원본 확인) | #E87A2E (추정) |

---

## 6. 반응형 브레이크포인트

### CSS Media Query에서 추출한 브레이크포인트 (전체)

```
360px   — 소형 모바일
400px   — 모바일
576px   — 대형 모바일
577px   — 태블릿 시작
767px   — 태블릿 끝
768px   — 태블릿 가로
987px   — 소형 데스크톱 시작
988px   — 데스크톱
1080px  — 중형 데스크톱
1280px  — 대형 데스크톱
1530px  — 와이드
1680px  — 울트라와이드
1920px  — Full HD
```

### Tailwind CSS 매핑 추천

| Tailwind | 원본 BP | 설명 |
|----------|---------|------|
| `sm` (640→576) | 576px | 모바일→태블릿 전환 |
| `md` (768) | 768px | 태블릿 가로 |
| `lg` (1024→988) | 988px | 데스크톱 |
| `xl` (1280) | 1280px | 대형 데스크톱 |
| `2xl` (1536→1530) | 1530px | 와이드 |

### vw 기반 사이즈 추정

모든 크기가 소수점을 포함 (vw 기반 가능성):
- 116.667px = 약 7.94vw (1470px 기준)
- 50px = 약 3.4vw
- 12.5px = 약 0.85vw
- 컨테이너 margin 40px은 모바일에서 줄어들 가능성

---

## 7. 무료 대체 폰트 추천 (Telegraf 대체)

### 원본: PP Telegraf (Pangram Pangram, 유료)
- Geometric sans-serif, 깔끔하고 모던
- Weight: Light(300), Regular(400) 위주 사용
- 특징: 정제된 기하학적 형태, 적절한 곡선감

### 추천 1: Figtree (Google Fonts) ⭐ 최우선 추천
- **URL**: https://fonts.google.com/specimen/Figtree
- **타입**: Geometric sans-serif, 깔끔 + friendly
- **Weights**: Variable (300~900) — Light/Regular/Medium/SemiBold/Bold/ExtraBold/Black
- **장점**:
  - 사용자 직접 언급한 폰트
  - Light(300) weight 있어 히어로 타이틀에 적합 (원본 히어로가 weight 300)
  - 현대적이고 깔끔, Telegraf의 정제된 느낌 유사
  - 280+ Latin 언어 지원
- **단점**: Telegraf보다 약간 더 casual/friendly한 느낌 (t, f, y에 곡선)

### 추천 2: Space Grotesk (Google Fonts)
- **URL**: https://fonts.google.com/specimen/Space+Grotesk
- **타입**: Geometric sans-serif, 모던/미래적
- **Weights**: 300~700 (Light, Regular, Medium, SemiBold, Bold)
- **장점**: rounded terminals, diagonal cuts, OpenType 기능 풍부, tabular figures
- **단점**: Telegraf 대비 약간 더 기하학적/차가운 느낌

### 추천 3: Montserrat (Google Fonts)
- **URL**: https://fonts.google.com/specimen/Montserrat
- **타입**: Classic geometric sans-serif
- **Weights**: 100~900 (매우 다양)
- **장점**: Telegraf과 유사한 urban/classic 느낌, 검증된 인기 폰트
- **단점**: 너무 흔해서 차별성 부족

### 추천 4: Inter (Google Fonts)
- **URL**: https://fonts.google.com/specimen/Inter
- **타입**: Neutral sans-serif
- **Weights**: Variable 100~900
- **장점**: 가독성 최적화, UI 친화적
- **단점**: Telegraf 대비 개성 부족, 너무 중립적

### 현재 프로젝트 적용 방안

현재 CLAUDE.md: Vollkorn(serif, heading) + Poppins(sans, body)

**옵션 A: Figtree로 Poppins 대체 (본문만)**
```
Heading: Vollkorn (serif) — 유지
Body: Figtree (sans) — Poppins 대체
```
→ 세리프+산세리프 조합 유지, 본문만 더 현대적으로

**옵션 B: Figtree 단독 사용 (원본 스타일 그대로)**
```
All: Figtree — Heading/Body 모두 (weight로 구분)
- Hero/H1: Figtree Light (300), 대형
- H2/H3: Figtree SemiBold (600)
- Body: Figtree Regular (400)
- Nav/CTA: Figtree Regular (400), uppercase
```
→ 원본처럼 단일 폰트 체계. 가장 원본에 가까운 접근.

**옵션 C: Space Grotesk + Vollkorn**
```
Heading: Vollkorn (serif) — 유지
Body: Space Grotesk (sans) — Poppins 대체
```
→ 좀 더 기하학적/테크 느낌

---

## 8. 빠진 사항 체크리스트

### 현재 Earthstrong 구현에서 빠진/부족한 항목

- [ ] **컨테이너 max-width 1520px + margin 40px** (현재 1440px + padding)
- [ ] **섹션 간격을 margin 기반으로 변경** (현재 padding 기반)
- [ ] **Manifesto "spotlight" opacity 애니메이션** (현재 clipPath)
- [ ] **Hero 제목 word-by-word reveal** (현재 없음)
- [ ] **Hero 슬라이드 전환 시 제목 re-reveal** (현재 단순 crossfade)
- [ ] **이미지 parallax (scale 1.1 + translateY)** (현재 기본 y축)
- [ ] **Lenis smooth scroll** (현재 없음)
- [ ] **Dot pagination 사각형 + active pill** (현재 원형)
- [ ] **헤더 텍스트 색상 전환** (hero=오프화이트, 스크롤후=검정)
- [ ] **SCROLL badge 20s 회전 + 화살표 bounce 분리** (현재 15s 단순)
- [ ] **"Work" 마키 타이틀 슬라이드** (원본 고유, 우리 사이트는 해당 없음)
- [ ] **Footer 파트너 마키 35s 속도** (현재 30s)
- [ ] **Footer 이메일 크기 ~92px** (확인 필요)
- [ ] **CTA 버튼 화살표 호버 애니메이션** (현재 없음)
- [ ] **프로젝트 카드 hover 시 이미지 scale 효과** (확인 필요)
- [ ] **letter-spacing 전역 0.8px 통일** (현재 불일치 가능)

---

## 9. 다음 프로젝트 빌드 시 체크리스트 (일반화)

### 조사 단계
1. [ ] 원본 사이트 폰트 확인 (document.fonts, @font-face 규칙)
2. [ ] 타이포그래피 스케일 전체 추출 (H1~H6, body, nav, button, footer)
3. [ ] 글로벌 컨테이너 설정 (max-width, padding vs margin)
4. [ ] 섹션 간격 패턴 (padding vs margin, 각 섹션 gap)
5. [ ] 색상 팔레트 추출 (텍스트, 배경, 강조, 비활성)
6. [ ] 사용 라이브러리 확인 (GSAP, Lenis, Luge, Barba 등)
7. [ ] CSS 키프레임 애니메이션 목록 추출
8. [ ] 페이지 로드 시퀀스 기록 (로더, 제목 reveal, 슬라이더 시작)
9. [ ] 스크롤 이벤트 효과 목록 (parallax, reveal, header 전환)
10. [ ] 헤더 동작 상세 (fixed/sticky, 색상전환, 높이변화, 배경전환)
11. [ ] 카드/그리드 레이아웃 패턴 (flex vs grid, gap, 카드 사이즈)
12. [ ] 버튼/CTA 스타일 (크기, 패딩, border, hover 효과)
13. [ ] 반응형 breakpoint 확인 (mobile/tablet/desktop)

### 빌드 단계
1. [ ] 조사 노트 기반으로 CLAUDE.md 디자인 가이드 작성
2. [ ] 에셋 다운로드 (로고, 이미지, 아이콘)
3. [ ] **Placeholder 이미지 대신 Unsplash/Pexels 실사 이미지 사용**
4. [ ] 글로벌 스타일 먼저 설정 (폰트, 컨테이너, 색상, 간격)
5. [ ] 애니메이션 라이브러리 설정 (GSAP config, Lenis 초기화)
6. [ ] 공통 컴포넌트 구현 (Header, Footer, Button, Badge)
7. [ ] 페이지별 구현 (홈 → 서브페이지)
8. [ ] 애니메이션 미세조정 (타이밍, easing, 트리거 위치)
9. [ ] 반응형 테스트 (mobile, tablet, desktop)
10. [ ] 빌드 검증 (TypeScript 에러, 라우트 접근, 애니메이션 작동)

---

## 10. Easing Functions 참조

| 이름 | cubic-bezier | 용도 |
|------|-------------|------|
| **Power4.out** (근사) | (0.19, 1, 0.22, 1) | 헤더 높이 전환 |
| **ExpoInOut** (근사) | (0.86, 0, 0.07, 1) | Manifesto 라인 transform |
| **Power3.out** (근사) | (0.23, 1, 0.32, 1) | Manifesto 라인 opacity, 화살표 bounce |
| **Power3.in** (근사) | (0.755, 0.05, 0.855, 0.06) | 화살표 bounce 시작 |

---

*이 문서는 generousbranding.com 레이아웃 복제 프로젝트의 기준 자료로 사용합니다.*
*모든 수치는 Desktop 1470px viewport 기준 측정값입니다.*
