# Earthstrong Canada - Website Build Specification

## Project Overview

Earthstrong Canada 기업 웹사이트. generousbranding.com의 **레이아웃/인터랙션을 그대로 복제**하되, 콘텐츠를 Earthstrong Canada(농업 작물 영양/토양 분석 회사)에 맞게 교체.

- **회사**: Earthstrong Canada (Floratine Products Group 자회사, 2021년 설립)
- **사업**: 서부 캐나다 농업인을 위한 고급 작물 영양 및 토양 분석 솔루션
- **슬로건**: "Rooted In Efficiency"
- **타겟**: B2B - 농업 소매상/딜러 + 농업인

---

## Tech Stack

- **Next.js 15** (App Router, `src/` directory)
- **TypeScript**
- **Tailwind CSS v4**
- **GSAP 3** + ScrollTrigger (`gsap`, `@gsap/react`)
- **next/font/google** (Vollkorn + Figtree)

### 초기화 명령어
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install gsap @gsap/react
```

---

## Design Style Guide

### Colors

| Token | Hex | 용도 |
|-------|-----|------|
| `brand-green` | `#2D5A27` | Primary - 로고, CTA 버튼, 강조 |
| `brand-teal` | `#7EBEC5` | Secondary - 링크 hover, 액센트 |
| `brand-cream` | `#EFE9E7` | 배경 - manifesto 섹션, 밝은 섹션 |
| `brand-dark` | `#1a1a1a` | Footer, 마키, 어두운 섹션 |
| `brand-charcoal` | `#333333` | 본문 텍스트 |
| `white` | `#FFFFFF` | 기본 배경 |
| `brand-orange` | `#E87A2E` | 포인트 컬러 - 배지, 아이콘 (원본 사이트 SCROLL 배지 색상 참고) |

### Typography

| 용도 | Font | Weight | 크기 (Desktop / Tablet / Mobile) |
|------|------|--------|------|
| H1 (Hero) | Vollkorn (serif) | 700 | 96px / 64px / 36px |
| H2 (Section) | Vollkorn | 600 | 56px / 42px / 28px |
| H3 (Card title) | Vollkorn | 600 | 32px / 26px / 22px |
| Body | Figtree (sans) | 400 | 18px / 16px / 16px |
| Body small | Figtree | 300 | 14px / 14px / 13px |
| Nav links | Figtree | 500 | 14px / 14px / 14px |
| Button | Figtree | 600 | 14px uppercase, letter-spacing 0.1em |

> **폰트 변경 이력**: Poppins → Figtree (2026-03-07)
> Figtree: Google Fonts, Geometric sans-serif, Variable font (300~900), generousbranding.com의 Telegraf(유료)와 유사한 느낌.

**Tailwind font 설정:**
```typescript
fontFamily: {
  heading: ["var(--font-vollkorn)", "serif"],
  body: ["var(--font-figtree)", "sans-serif"],
}
```

**next/font 설정 (layout.tsx):**
```typescript
import { Vollkorn, Figtree } from "next/font/google";
const vollkorn = Vollkorn({ subsets: ["latin"], variable: "--font-vollkorn", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-figtree", display: "swap" });
```

### Spacing System

- Container: `max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20`
- Section vertical padding: `py-20 md:py-32 lg:py-40`
- Card gap: `gap-6 md:gap-8`
- Component 내 gap: `gap-4`

### Border & Radius

- 버튼: `rounded-full border border-brand-dark` (pill 형태)
- 카드 이미지: `rounded-none` (사각형, 라운딩 없음)
- 입력 필드: `rounded-md`

### Shadows

- 카드 hover: `shadow-none` → `shadow-lg` transition
- Header scroll: `shadow-sm`

### Animations (GSAP)

모든 애니메이션 컴포넌트는 반드시 `"use client"` 선언.

| 애니메이션 | 적용 대상 | GSAP 설정 |
|-----------|----------|----------|
| Text Reveal | ManifestoSection, VisionHero, MissionStatement | `clipPath: "inset(0 100% 0 0)"` → `"inset(0 0% 0 0)"`, duration 1.2s, ease `power4.out`, ScrollTrigger start `top 85%` |
| Fade Up | 카드, 그리드 아이템, 텍스트 블록 | `y: 60, opacity: 0` → `y: 0, opacity: 1`, duration 1s, stagger 0.15, ease `power3.out` |
| Parallax | 대형 이미지 | `y: 0` → `y: speed*100`, scrub true |
| Hero Slider | HeroSlider | GSAP timeline, autoAlpha crossfade, 5초 auto-advance |
| Marquee | PartnerMarquee | CSS `@keyframes marquee { 0% { translateX(0) } 100% { translateX(-50%) } }` 30s linear infinite |
| Spin Slow | ScrollBadge | CSS `animation: spin 15s linear infinite` |
| Image Hover | 카드 이미지 | CSS `hover:scale-105 transition-transform duration-500`, 부모 `overflow-hidden` |

**GSAP 초기화 (src/lib/gsap-config.ts):**
```typescript
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
```

**주의**: `useGSAP` 훅 사용 시 컴포넌트 unmount 시 자동 cleanup. 라우트 변경 시 `ScrollTrigger.refresh()` 호출 필요.

---

## Sitemap & Page Specifications

### Navigation Mapping

| 메뉴 | URL | 원본 (generousbranding.com) |
|------|-----|---------------------------|
| Products | `/products` | `/work/` |
| Vision | `/vision` | `/vision/` |
| About | `/about` | `/agence/` |
| Contact | `/contact` | `/contact/` |
| Login | `/login` | (신규 - 원본에 없음) |
| Legal | `/legal` | `/mentions-legales/` |
| Cookie Policy | `/cookie-policy` | `/politique-cookies/` |

---

### 1. Homepage (`/`) - `src/app/page.tsx`

원본: generousbranding.com 메인

**섹션 순서 (위→아래):**

#### 1-1. HeroSlider (`src/components/home/HeroSlider.tsx`)
- 풀스크린 (`h-screen w-full relative overflow-hidden`)
- 3~4장 이미지 슬라이드 (crossfade 전환, 5초 auto)
- 하단 좌측: 슬라이드 제목 (H1 크기, 흰색) + 서브타이틀
- 하단 중앙: dot pagination (8~10px 원형, active=filled)
- 하단 우측: ScrollBadge (회전하는 "SCROLL" 원형 SVG)
- 이미지 위 어두운 그라디언트 오버레이 (`bg-gradient-to-t from-black/50`)

**슬라이드 데이터:**
```
Slide 1: image="/images/hero/homepage-hero.webp", title="Maximizing Yields & Profits", subtitle="Advanced crop nutrition for Canadian farmers"
Slide 2: image="/images/backgrounds/large-section-bg.webp", title="Science-Based Soil Solutions", subtitle="Patented Solumetrix technology"
Slide 3: image="https://placehold.co/1920x1080/2D5A27/FFFFFF?text=Earthstrong", title="Rooted In Efficiency", subtitle="Total Nutrition Management"
```

#### 1-2. ManifestoSection (`src/components/home/ManifestoSection.tsx`)
- `bg-white`, 세로 중앙 정렬, `min-h-screen`
- 대형 세리프 텍스트 (H2+ 크기), 스크롤 시 한 줄씩 clipPath reveal
- 텍스트: "BRINGING CANADIAN PRODUCERS THE NEXT LEVEL OF NUTRITION MANAGEMENT THAT MAXIMIZES YIELDS AND PROFITS."
- 아래에 서브텍스트: "Partnering science-based nutrition solutions refined over three decades of research with cutting-edge soil analysis technology."
- CTA 버튼: "OUR VISION →" → `/vision` (pill 형태, border 스타일)

#### 1-3. FeaturedProduct (`src/components/home/FeaturedProduct.tsx`)
- 비대칭 2컬럼: 좌 40% 텍스트 / 우 60% 이미지 (desktop), 모바일은 스택
- 좌: 제품명 "Solumetrix →" (H2, 링크), 설명문
- 우: 큰 이미지 (`/images/products/solumetrix.webp`), parallax 효과
- 설명: "Patented soil testing technology that identifies what nutrients are truly soluble and accessible to your plants at any given moment."

#### 1-4. ProductGrid (`src/components/home/ProductGrid.tsx`)
- 2컬럼 그리드 (desktop), 1컬럼 (mobile)
- 2개 제품 카드: Harbor Brands, Collect-N-Go
- 카드: 이미지(4:3) + 제목(H3, → 화살표) + 짧은 설명
- hover 시 이미지 scale-105

**카드 데이터:**
```
Card 1: image="/images/products/harbour-nutrients.webp", title="Harbor Brands →", desc="Over 9 organically chelated micro and macronutrient solutions using Soil To Cell Technology."
Card 2: image="https://placehold.co/800x600/EFE9E7/333?text=Collect-N-Go", title="Collect-N-Go →", desc="Patented soil sampling equipment for precise, repeatable field analysis."
```

#### 1-5. SmallProductCards (`src/components/home/SmallProductCards.tsx`)
- 3컬럼 (desktop), 2컬럼 (tablet), 1컬럼 (mobile)
- 3개 제품: Cove, Fjord, Advanced Crop Nutrition
- 작은 카드: 이미지(3:2) + 제목 + 한 줄 설명

**카드 데이터:**
```
Card 1: image="https://placehold.co/800x533/EFE9E7/333?text=Cove", title="Cove →", desc="Nutrient protection that keeps applied fertilizers available and working."
Card 2: image="https://placehold.co/800x533/EFE9E7/333?text=Fjord", title="Fjord →", desc="Foliar nutrients up to 10x more available than soil-applied equivalents."
Card 3: image="/images/products/specialty-brands.webp", title="Advanced Crop Nutrition →", desc="Nitrogen management, soil aeration, and late-season crop support."
```

#### 1-6. PartnerMarquee (`src/components/home/PartnerMarquee.tsx`)
- `bg-brand-dark`, 전체 너비, `py-16`
- 흰색 대형 텍스트가 무한 가로 스크롤
- 이름 사이 `+` 구분자 (회색)
- 텍스트: "Pioneer Co-op + Emerge Agro + NuEra Seeds + Kindersley Co-Op + Agro Plus + Knee Hill Soil Services"
- 구현: 동일 내용 2번 반복 → CSS translateX(-50%) 애니메이션
- hover 시 일시정지 (`animation-play-state: paused`)

---

### 2. Products Index (`/products`) - `src/app/products/page.tsx`

원본: generousbranding.com/work/

- 페이지 제목: "Our Solutions" (H1)
- **필터 탭** (`ProductFilterTabs.tsx`):
  - "All" (기본) / "By Expertise"
  - "By Expertise" 선택 시 서브탭: Soil Analysis, Crop Nutrition, Nutrient Protection, Foliar Application, Soil Sampling, Nitrogen Management
- **제품 그리드**: 2컬럼 (desktop), 카드 = 이미지 + 제목 + 설명
- 필터 전환 시 fade 애니메이션

---

### 3. Product Detail (`/products/[slug]`) - `src/app/products/[slug]/page.tsx`

원본: generousbranding.com/work/[project]/

`generateStaticParams()`로 6개 slug 사전 렌더링.

**레이아웃 (위→아래):**

1. **ProductHero**: 풀너비 히어로 이미지 + 어두운 오버레이 + 제품명(H1, 흰색) + 카테고리 뱃지
2. **ProductMetadata**: 가로 메타데이터 바 - Category, Parent Brand, Application
3. **Product Body**: 2컬럼 (좌: 설명 텍스트, 우: 기능 카드 리스트)
4. **Sub-Products**: 있으면 그리드로 하위 제품 표시
5. **ProductGallery**: 이미지 갤러리 (풀너비 + 2컬럼 교차)
6. **NextProduct**: 다음 제품 배너 (배경 이미지 + 제품명 오버레이, 클릭 시 이동)

---

### 4. Vision (`/vision`) - `src/app/vision/page.tsx`

원본: generousbranding.com/vision/

1. **VisionHero**: 타이포그래피 중심, 이미지 없음. "Rooted In Efficiency" (H1, 대형 세리프). 아래에 설명문. clipPath text reveal.
2. **ServicePillars**: 3컬럼 카드 (데스크톱), 스택 (모바일)
   - Pillar 1: "01 — Soil Analysis" / "Understanding your soil is the foundation. Our patented Solumetrix technology reveals what nutrients are truly accessible to your crops."
   - Pillar 2: "02 — Crop Nutrition" / "Organically chelated nutrients with Soil To Cell Technology ensure nutrients assimilate directly in the plant cell without tie-up."
   - Pillar 3: "03 — Nutrient Protection" / "Protecting your investment. Our Cove and Fjord lines ensure applied nutrients stay available and work harder."
3. **ClientShowcase**: "Our Partners" - 파트너 로고 그리드 (그레이스케일, hover 시 컬러)

---

### 5. About (`/about`) - `src/app/about/page.tsx`

원본: generousbranding.com/agence/

1. **MissionStatement**: 대형 텍스트 블록, `bg-brand-cream`, text reveal 애니메이션
   - "Earthstrong Canada was established in 2021 as a subsidiary of Floratine Products Group, bringing three decades of science-based nutrition solutions to Canadian agricultural producers across Manitoba, Saskatchewan, and Alberta."
2. **TeamProfiles**: "Leadership" 섹션, 3컬럼 그리드
   - 6명 팀원 카드: 사각 사진 + 이름 + 직함 + 약력
3. **ClientGrid**: "Where to Find Us" - 주별로 정리된 딜러/파트너 목록

---

### 6. Contact (`/contact`) - `src/app/contact/page.tsx`

원본: generousbranding.com/contact/

- "Rooted In Efficiency" 장식 텍스트
- **대형 이메일**: `info@Strongterra.com` (H1급 크기, mailto 링크)
- **전화**: `(204)-583-4427` (tel 링크)
- 소셜 링크 (준비되면)
- 하단: 파트너 위치 간략 안내 → About 링크

---

### 7. Login (`/login`) - `src/app/login/page.tsx`

**UI 전용** (실제 인증 없음).

- 중앙 정렬 카드 레이아웃
- 상단: Earthstrong 로고
- 필드: Email input, Password input (visibility toggle), Remember Me 체크박스
- "Log In" 버튼 (`bg-brand-green text-white`)
- "Lost Password?" 링크 → alert 또는 contact 링크
- 하단: "Contact us for dealer access" → `/contact`
- `onSubmit`: `preventDefault()` only

---

### 8. Legal (`/legal`) - `src/app/legal/page.tsx`

간단한 텍스트 페이지. Tailwind `prose` 클래스.
- "Privacy Policy" 제목
- Earthstrong Canada 법적 정보 (회사명, 연락처, 호스팅 등)

### 9. Cookie Policy (`/cookie-policy`) - `src/app/cookie-policy/page.tsx`

- "Cookie Policy" 제목
- 쿠키 유형 설명 (Essential, Functional, Analytics, Advertising)

---

## Shared Components

### Layout

| 컴포넌트 | 파일 | 설명 |
|---------|------|------|
| Header | `src/components/layout/Header.tsx` | `"use client"`. fixed top, z-50. 스크롤 시 bg-white + shadow 전환. 좌: 로고 이미지(40px 높이), 우: nav 링크 + Login. 모바일: 햄버거 → 풀스크린 오버레이 메뉴 |
| Footer | `src/components/layout/Footer.tsx` | `bg-brand-dark text-white`. 4컬럼→스택. 로고+태그라인 / 메뉴링크 / 대형이메일+전화 / 법적링크. 하단: 저작권. 우하단: ScrollUpBadge |
| ScrollUpBadge | `src/components/layout/ScrollUpBadge.tsx` | 회전하는 원형 SVG "SCROLL UP" 텍스트. 클릭 시 `scrollTo(top)` |

### Home Sections

위 Homepage 섹션 참조. 각각 독립 `"use client"` 컴포넌트.

### Shared UI

| 컴포넌트 | 파일 | 설명 |
|---------|------|------|
| AnimatedText | `src/components/shared/AnimatedText.tsx` | GSAP clipPath text reveal. props: `text`, `className`, `delay` |
| Button | `src/components/shared/Button.tsx` | pill 형태 CTA. props: `href`, `label`, `variant` ("outline" \| "filled") |
| Badge | `src/components/shared/Badge.tsx` | 카테고리 태그. 작은 pill, bg-brand-cream |
| ImageWithPlaceholder | `src/components/shared/ImageWithPlaceholder.tsx` | next/image wrapper. `src` 없으면 placehold.co fallback |
| SectionHeading | `src/components/shared/SectionHeading.tsx` | 섹션 제목 + 선택적 서브타이틀 |

---

## File Structure

```
src/
  app/
    layout.tsx
    page.tsx                      # Homepage
    globals.css
    not-found.tsx
    products/
      page.tsx                    # Products index
      [slug]/
        page.tsx                  # Product detail
    vision/
      page.tsx
    about/
      page.tsx
    contact/
      page.tsx
    login/
      page.tsx
    legal/
      page.tsx
    cookie-policy/
      page.tsx
  components/
    layout/
      Header.tsx
      Footer.tsx
      ScrollUpBadge.tsx
    home/
      HeroSlider.tsx
      ScrollBadge.tsx
      ManifestoSection.tsx
      FeaturedProduct.tsx
      ProductGrid.tsx
      SmallProductCards.tsx
      PartnerMarquee.tsx
    products/
      ProductFilterTabs.tsx
      ProductCard.tsx
      ProductHero.tsx
      ProductMetadata.tsx
      ProductGallery.tsx
      NextProduct.tsx
    vision/
      VisionHero.tsx
      ServicePillars.tsx
      ClientShowcase.tsx
    about/
      MissionStatement.tsx
      TeamProfiles.tsx
      TeamMember.tsx
      ClientGrid.tsx
    contact/
      ContactInfo.tsx
    login/
      LoginForm.tsx
    shared/
      AnimatedText.tsx
      Button.tsx
      Badge.tsx
      ImageWithPlaceholder.tsx
      SectionHeading.tsx
  lib/
    gsap-config.ts
    animations.ts                 # 재사용 애니메이션 팩토리 함수
    utils.ts                      # cn() 등 유틸리티
  data/
    products.ts
    team.ts
    partners.ts
    navigation.ts
    site.ts
    expertise.ts
  types/
    index.ts
public/
  images/
    logo/
      earthstrong-logo.png
    hero/
      homepage-hero.webp
    products/
      solumetrix.webp
      harbour-nutrients.webp
      specialty-brands.webp
    backgrounds/
      large-section-bg.webp
    fields/
      image-overlap-large.webp
      image-overlap-small.webp
      contact-grid-2.webp
      contact-grid-4.webp
    icons/
      ico-sprout.webp
    partners/
      pioneer-coop.png
      emerge.png
      nu-era-seeds.png
      kindersley-coop.jpg
      agroplus.png
```

---

## Data Schemas

### Product (`src/types/index.ts`)

```typescript
export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  shortDescription: string;
  heroImage: string;
  thumbnailImage: string;
  categories: ExpertiseCategory[];
  features: { title: string; description: string }[];
  subProducts?: { name: string; focus: string; description: string }[];
}

export type ExpertiseCategory =
  | "soil-analysis" | "crop-nutrition" | "nutrient-protection"
  | "foliar-application" | "soil-sampling" | "nitrogen-management";

export interface TeamMember {
  name: string; title: string; bio: string; image: string;
}

export interface Partner {
  name: string; logo: string; location: string; province: string;
}

export interface NavItem {
  label: string; href: string;
}

export interface SiteConfig {
  companyName: string; tagline: string; email: string; phone: string;
  parentCompany: string;
}
```

---

## Product Data (6개)

### 1. Solumetrix
- slug: `solumetrix`
- tagline: "See What Your Soil Really Holds"
- shortDescription: "Patented soil testing technology that identifies what nutrients are truly soluble and accessible to your plants."
- description: "Based on thousands of data correlations refined over three decades, Solumetrix goes beyond standard soil tests. It reveals the nutrients that are actually available to your crops at any given moment, enabling balanced fertility recommendations that maximize yield while minimizing waste."
- categories: `["soil-analysis"]`
- heroImage: `/images/products/solumetrix.webp`
- features: Patented Analysis, Balanced Recommendations, Data-Driven Results, Waste Reduction

### 2. Harbor Brands
- slug: `harbor-brands`
- tagline: "Soil To Cell Technology"
- shortDescription: "Over 9 organically chelated micro and macronutrient solutions using Soil To Cell Technology."
- description: "Harbor's lineup of organically chelated nutrients ensures each element assimilates directly in the plant cell without tie-up in the soil. Tank-mix compatible and proven across Western Canadian conditions."
- categories: `["crop-nutrition", "foliar-application"]`
- heroImage: `/images/products/harbour-nutrients.webp`
- subProducts: HARBOR-B (Boron), HARBOR-Cl (Chloride), HARBOR-Cu (Copper), HARBOR-Fe (Iron), HARBOR-K (Potassium), HARBOR-S (Sulphur), HARBOR-Zn (Zinc), HARBOR 3-18 Blend, HARBOR-Mn (Manganese)

### 3. Collect-N-Go
- slug: `collect-n-go`
- tagline: "Precision Starts With The Sample"
- shortDescription: "Patented soil sampling equipment for precise, repeatable field analysis."
- description: "Collect-N-Go provides standardized, repeatable soil sampling that forms the foundation of precision agriculture. Consistent sampling means consistent data, leading to better nutrient management decisions."
- categories: `["soil-sampling"]`
- heroImage: `https://placehold.co/1920x1080/EFE9E7/333?text=Collect-N-Go`

### 4. Cove
- slug: `cove`
- tagline: "Protect Your Nutrient Investment"
- shortDescription: "Nutrient protection that keeps applied fertilizers available and working."
- description: "Cove products protect applied nutrients from becoming unavailable in the soil. By reducing salt effects and promoting root development, Cove ensures your fertilizer investment delivers maximum return."
- categories: `["nutrient-protection"]`
- heroImage: `https://placehold.co/1920x1080/EFE9E7/333?text=Cove`
- subProducts: COVE-N (nitrogen protection), COVE-P (phosphorus protection), COVE-P RTU (ready-to-use)

### 5. Fjord
- slug: `fjord`
- tagline: "Foliar Efficiency Redefined"
- shortDescription: "Foliar nutrients up to 10x more available than soil-applied equivalents."
- description: "Fjord delivers critical nutrients directly through the leaf when crops need them most. Bypassing soil tie-up, Fjord products provide phosphate, calcium, and magnesium at efficiencies far exceeding traditional soil application."
- categories: `["crop-nutrition", "foliar-application"]`
- heroImage: `https://placehold.co/1920x1080/EFE9E7/333?text=Fjord`
- subProducts: Fjord-P (phosphate+potassium), Fjord-Ca (calcium), Fjord-Mg (magnesium)

### 6. Advanced Crop Nutrition
- slug: `advanced-crop-nutrition`
- tagline: "Complete Season Support"
- shortDescription: "Nitrogen management, soil aeration, and late-season crop support."
- description: "A complete suite of advanced products supporting every stage of crop growth — from nitrogen management with Augusta Max to soil mineralization with CaL AIR, carbohydrate support with FleKsy, and nitrogen conversion with MoNi."
- categories: `["nitrogen-management", "crop-nutrition"]`
- heroImage: `/images/products/specialty-brands.webp`
- subProducts: Augusta Max, CaL AIR, FleKsy, MoNi

---

## Team Data (6명)

```
1. Kevin Cavanaugh - President & CEO - "Leading Earthstrong Canada's mission to bring advanced nutrition management to Canadian producers."
2. Garth Render - Executive VP, Earthstrong Canada - "Driving operations and partnerships across Western Canada's agricultural landscape."
3. Mike Cavanaugh - Executive VP & Co-Owner, Floratine Products Group - "Three decades of experience in agricultural nutrition science and product development."
4. Kory Wheeler - Executive VP, Earthstrong Ag Division - "Overseeing agronomic strategy and division growth across the prairies."
5. Phil Deobald - Product Specialist - "On-the-ground expertise helping growers optimize nutrition programs."
6. Colton Holden - Product Specialist - "Supporting dealers and producers with tailored crop nutrition solutions."
```

이미지: 모두 placeholder `https://placehold.co/400x400/2D5A27/FFFFFF?text=[이니셜]`

---

## Partner Data (7개)

```
{ name: "Pioneer Co-op", logo: "/images/partners/pioneer-coop.png", location: "Swift Current", province: "Saskatchewan" }
{ name: "Emerge Agro", logo: "/images/partners/emerge.png", location: "Eston", province: "Saskatchewan" }
{ name: "NuEra Seeds", logo: "/images/partners/nu-era-seeds.png", location: "Gladstone", province: "Manitoba" }
{ name: "Kindersley District Co-Op", logo: "/images/partners/kindersley-coop.jpg", location: "Kindersley", province: "Saskatchewan" }
{ name: "Agro Plus", logo: "/images/partners/agroplus.png", location: "Lethbridge & Medicine Hat", province: "Alberta" }
{ name: "Knee Hill Soil Services", logo: "https://placehold.co/200x80/FFF/333?text=Knee+Hill", location: "Linden", province: "Alberta" }
```

---

## Asset Download URLs

빌드 시작 전에 다운로드하여 `public/images/`에 저장:

```
curl -o public/images/logo/earthstrong-logo.png "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2024/03/Earthstrong-Canada-Final.png"
curl -o public/images/hero/homepage-hero.webp "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2023/06/HomePage-Hero.webp"
curl -o public/images/backgrounds/large-section-bg.webp "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2023/06/Large-Section-Bg-Home.webp"
curl -o public/images/products/harbour-nutrients.webp "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2023/06/Homepage_Product-Harbour_Nutrients.webp"
curl -o public/images/products/solumetrix.webp "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2023/06/Homepage_Product-Solumetrix.webp"
curl -o public/images/products/specialty-brands.webp "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2023/06/Homepage_Product-Specialty_Brands.webp"
curl -o public/images/fields/image-overlap-large.webp "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2023/06/Image-overlap-large.webp"
curl -o public/images/fields/image-overlap-small.webp "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2023/06/Image-overlap-small.webp"
curl -o public/images/fields/contact-grid-2.webp "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2023/06/Contact-grid-2-e1761749304838.webp"
curl -o public/images/fields/contact-grid-4.webp "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2023/06/Contact-grid-4-e1761749389312.webp"
curl -o public/images/icons/ico-sprout.webp "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2023/06/ico-sprout.webp"
curl -o public/images/partners/pioneer-coop.png "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2024/02/Pioneer-Co-op-Logo-h240.png"
curl -o public/images/partners/emerge.png "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2024/02/Emerge-Logo.png"
curl -o public/images/partners/nu-era-seeds.png "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2024/02/nu-era-seeds-logo.jpeg"
curl -o public/images/partners/kindersley-coop.jpg "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2025/12/Kindersley-District-Co-op-Logo.jpg"
curl -o public/images/partners/agroplus.png "https://strongterra-canada-v1772059806.websitepro-cdn.com/wp-content/uploads/2024/01/logo-agroplus.png"
```

---

## Build Order (권장 순서)

1. **프로젝트 초기화**: `create-next-app`, 의존성 설치, Tailwind 설정
2. **에셋 다운로드**: curl로 이미지 다운로드
3. **기초 파일**: types, data files, lib (gsap-config, animations, utils)
4. **Root layout**: layout.tsx (폰트, 메타데이터)
5. **Header + Footer**: 전체 사이트 공통 레이아웃
6. **Shared components**: AnimatedText, Button, Badge, ImageWithPlaceholder
7. **Homepage**: HeroSlider → ManifestoSection → FeaturedProduct → ProductGrid → SmallProductCards → PartnerMarquee
8. **Products 페이지**: Index + [slug] 동적 라우트
9. **Vision 페이지**
10. **About 페이지**
11. **Contact 페이지**
12. **Login 페이지**
13. **Legal + Cookie Policy 페이지**
14. **not-found.tsx**
15. **반응형 테스트 및 애니메이션 미세 조정**

---

## Verification

빌드 후 확인사항:
1. `npm run dev` → 에러 없이 실행
2. 모든 9개 라우트 접근 가능 (`/`, `/products`, `/products/solumetrix`, `/vision`, `/about`, `/contact`, `/login`, `/legal`, `/cookie-policy`)
3. 히어로 슬라이더 자동 전환 작동
4. 스크롤 시 텍스트 reveal 애니메이션 작동
5. 파트너 마키 무한 스크롤 작동
6. 헤더 스크롤 시 배경색 전환
7. 모바일 메뉴 열기/닫기
8. 제품 필터 탭 동작
9. 제품 상세 → Next Product 네비게이션
10. `npm run build` → 에러 없이 빌드 성공
