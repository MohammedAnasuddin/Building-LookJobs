# LookJobs v1 — Design System

## Philosophy

LookJobs is not a traditional job-search product.  
It is a calm, daily-updated opportunity feed.

The interface should feel:

- calm

- technical

- structured

- trustworthy

- fast to scan

- low fatigue

The product is NOT:

- playful

- colorful SaaS

- corporate enterprise

- flashy startup UI

The visual identity combines:

- Linear → structure, density, surfaces, dark mode

- Stripe → typography confidence, premium spacing

- Notion → readability and calmness

- Architect Blueprint → sharp technical atmosphere and blueprint-like precision

---

# Core UX Identity

## Product Model

LookJobs is a:

> Daily Job Drop

Users open the app once or multiple times daily to:

- discover new jobs

- save opportunities

- apply externally

The system updates daily.

---

# Visual Personality

## Keywords

- Calm

- Technical

- Structured

- Modern

- Restrained

- Dense but breathable

## Avoid

The UI should preserve a subtle blueprint-engineering atmosphere:

- sharp alignment

- restrained geometry

- technical clarity

- calm dark surfaces

Avoid turning the product into:

- a futuristic cyberpunk UI

- an overly soft consumer app

- a colorful SaaS dashboard

- bright gradients

- oversized illustrations

- playful blobs

- heavy animations

- pastel cards

- overly soft geometry

---

# Color System

## Primary Accent

```css
--primary: #2E8FC4;
--primary-hover: #4DA4D4;
--primary-focus: rgba(46,143,196,0.35);
```

Used ONLY for:

- primary CTA

- focus states

- active tabs

- selected states

- links

Do not use primary as:

- page backgrounds

- large card fills

- decorative gradients

---

## Dark Theme (Primary Theme)

```css
--canvas: #010102;
--surface-1: #0D1117;
--surface-2: #111827;
--surface-3: #161B22;

--hairline: #23252A;
--hairline-strong: #2D333B;

--ink: #F7F8F8;
--ink-muted: #D0D6E0;
--ink-subtle: #8A8F98;
--ink-tertiary: #62666D;
```

---

## Light Theme

```css
--canvas: #F7F9FB;
--surface-1: #FFFFFF;
--surface-2: #F3F5F7;

--hairline: #E5E7EB;
--hairline-strong: #D1D5DB;

--ink: #0D2234;
--ink-muted: #5A7589;
--ink-subtle: #7B8794;
```

---

# Typography

## Font Stack

Primary:

```css
font-family: Inter, SF Pro Display, system-ui, sans-serif;
```

Mono:

```css
font-family: JetBrains Mono, ui-monospace, monospace;
```

Mono is reserved for:

- timestamps

- metadata

- source labels

- debug/admin views

---

## Typography Scale

| Token      | Size | Weight | Line Height | Use            |
| ---------- | ---- | ------ | ----------- | -------------- |
| display-xl | 56px | 600    | 1.05        | Marketing hero |
| display-lg | 40px | 600    | 1.10        | Section titles |
| heading-1  | 28px | 600    | 1.20        | Feed headers   |
| heading-2  | 22px | 600    | 1.25        | Card emphasis  |
| title      | 18px | 600    | 1.30        | Job title      |
| body       | 16px | 400    | 1.50        | Primary body   |
| body-sm    | 14px | 400    | 1.50        | Company/meta   |
| caption    | 12px | 400    | 1.40        | Timestamps     |
| mono       | 12px | 400    | 1.40        | Source labels  |

---

## Typography Rules

DO:

- keep hierarchy strong

- use muted secondary text

- prioritize readability

DON'T:

- use ultra-light Stripe 300 weights

- use more than 4 text sizes on one card

- use colorful text hierarchy

---

# Layout System

## Spacing Scale

Base unit: 4px

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
```

---

## Layout Rhythm

- Dense information

- Generous breathing room

- Minimal decoration

The feed should feel:

> scan-first

NOT:

> visually overwhelming

---

# Geometry System

LookJobs uses restrained geometric structure inspired by Architect Blueprint.

Principles:

- structured alignment

- sharp visual rhythm

- controlled spacing

- minimal ornamental softness

The UI should feel:

> engineered, not decorative

---

# Border Radius

```css
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-pill: 9999px;
```

## Usage

| Radius | Usage            |
| ------ | ---------------- |
| 4px    | small tags       |
| 8px    | buttons + inputs |
| 12px   | cards            |
| 16px   | major panels     |

---

# Elevation System

LookJobs is border-first.  
Shadows are secondary.

## Default Elevation

```css
border: 1px solid var(--hairline);
```

## Hover Elevation

```css
box-shadow:
rgba(50,50,93,0.10) 0px 12px 24px -12px,
rgba(0,0,0,0.08) 0px 8px 16px -8px;
```

---

# Motion

## Motion Philosophy

Motion should:

- clarify

- guide

- respond

Motion should NOT:

- entertain

- distract

- bounce

---

## Timing

```css
transition: 150ms ease;
```

Hover:

- subtle

- restrained

---

# Feed Architecture

## Feed Sections

1. Today

2. Yesterday

3. Last 7 Days

4. Older Jobs (archive)

---

## Infinite Scroll

Infinite scroll loads:

- cached DB jobs only

Scraper NEVER triggers on scroll.

---

# Job Card System

## Card Philosophy

Cards exist for:

- grouping

- readability

- interaction containment

Cards should NOT:

- feel oversized

- feel decorative

- feel colorful

---

# Job Card Layout

```text
----------------------------------
Title                     Bookmark
Company

Tags / Remote / Fresher

2h ago • LinkedIn     Apply
----------------------------------
```

---

## Job Card Structure

### Top Row

Left:

- Job title

- Company

Right:

- Bookmark action

---

### Middle Row

- Tags

- Remote

- Fresher

- metadata

---

### Bottom Row

Left:

- timestamp

- source

Right:

- Apply button

---

# Buttons

## Primary Button

```css
background: var(--primary);
color: white;
border-radius: 8px;
padding: 8px 14px;
```

Used for:

- Apply

- Continue

- Save settings

---

## Secondary Button

```css
background: transparent;
border: 1px solid var(--hairline);
```

---

# Tabs

Job preferences appear as top tabs.

Example:

```text
[ Full Stack ] [ AI Engineer ] [+]
```

Rules:

- horizontally scrollable

- compact

- text-first

- active tab uses primary accent

---

# Search

Search supports:

- title

- company

- tags

- source

- remote

- fresher

Search bar should remain:

- compact

- sticky near top

- low-noise

---

# Empty States

## First-Time Loading

Show:

- 3 skeleton cards

- “Finding jobs for you...”

---

## All Caught Up

```text
You're all caught up for today.
New jobs arrive tomorrow.
```

Jobs remain visible below.

---

# Dark Mode Rules

Dark mode is NOT:

- OLED pure black

- neon cyberpunk

- glow-heavy

Dark mode IS:

- calm

- layered

- technical

Use:

- surface hierarchy

- subtle borders

- restrained blue accent

---

# Accessibility

## Minimum Contrast

- body text must pass WCAG AA

- muted text must remain readable

---

## Touch Targets

Minimum:

```css
44px
```

for:

- buttons

- inputs

- bookmark actions

---

# Responsive Rules

## Mobile First

Primary target:

- mobile users

---

## Breakpoints

| Name    | Width      |
| ------- | ---------- |
| Mobile  | <640px     |
| Tablet  | 640–1024px |
| Desktop | >1024px    |

---

## Mobile Feed

- single column

- full-width cards

- sticky top tabs

---

# Interaction Rules

## Hover

Desktop only.

Subtle:

- border shift

- shadow increase

Never:

- scale cards

- bounce

- rotate

---

## Focus States

All focusable elements:

```css
outline: 2px solid var(--primary-focus);
```

---

# Anti-Patterns

DO NOT:

- use gradients

- use glassmorphism

- use giant shadows

- use oversized border radius

- use pastel feature cards

- use multiple accent colors

- use playful onboarding illustrations

- use heavy animations

- use colorful dashboard widgets

---

# Brand Voice

LookJobs should feel like:

- a precision tool

- built by engineers

- for focused job seekers

NOT:

- social media

- recruiting agency software

- startup hype product

---

# Design Principles Summary

1. Typography dominates over decoration

2. Borders dominate over shadows

3. Calmness over excitement

4. Scanning over storytelling

5. Precision over playfulness

6. Structured density over visual emptiness

7. Consistency over experimentation

---

# Final UI Reference Stack

Primary:

- Linear

Visual Atmosphere:

- Architect Blueprint

Secondary:

- Stripe

Minor Influence:

- Notion

Atmosphere:

- Architect Blueprint-inspired technical clarity

- Calm technical productivity UI
