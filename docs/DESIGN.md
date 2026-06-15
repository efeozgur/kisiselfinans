# Tasarım Sistemi

## Glassmorphism
- Yarı saydam arka plan (`rgba(255,255,255,0.6)` light / `rgba(30,41,59,0.4)` dark)
- `backdrop-filter: blur(16px) saturate(140%)`
- İnce ışık kenarı (`border: 1px solid rgba(255,255,255,0.4)`)
- Yumuşak gölge + iç inset parıltı

## Token'lar
`client/src/styles/tokens.css` içinde:
- `--bg-base`, `--bg-grad-{from,via,to}`
- `--glass-bg`, `--glass-bg-strong`, `--glass-border`
- `--text-primary/secondary/muted`
- `--color-income` (#10b981), `--color-expense` (#ef4444), `--color-warning` (#f59e0b), `--color-info` (#6366f1)

## Tipografi
- `Inter` 400/500/600/700/800
- `system-ui` fallback

## Bileşim İlkeleri
- **Kart:** `rounded-2xl` + `.glass` veya `.glass-strong` + `shadow-glass`
- **Hover:** `scale(1.02)` + gölge derinleşir, 200ms ease-out
- **Karanlık mod:** Tailwind `darkMode: 'class'`; Zustand + persist (`localStorage`)
- **Sayfa geçişi:** `animate-fade-in` (200ms fade + 8px translateY)

## Erişilebilirlik
- `prefers-reduced-motion` desteği (animasyonlar ~0ms)
- `focus-ring` yardımcı sınıfı (tüm interaktif öğelerde)
- ARIA etiketleri: nav, header, butonlar
- Kontrast: WCAG AA hedefi (metin/saydam arka plan üzerinde ≥4.5:1)

## Layout
- `Sidebar` (md+, 64 veya 80px genişlik, collapse)
- `Topbar` sticky (glassmorphism, arama + bildirim + tema)
- Ana içerik: 1 col mobil, 2-4 col masaüstü (Tailwind grid)
- Boşluk ölçeği: 4 / 8 / 12 / 16 / 24
