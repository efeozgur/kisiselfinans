# PRD — Yerel Finance

## 1. Vizyon
Bireysel kullanıcı için modern, glassmorphism tasarımlı, karanlık/aydınlık mod destekli kişisel gelir-gider takip uygulaması. Taksit, tekrarlayan işlem, bütçe ve hedef modülleri ile "kişisel CFO" hissi veren bir deneyim.

## 2. Hedef Kitle
Kendi finansını takip etmek isteyen **tek bir son kullanıcı** (yerel kurulum). Çoklu kullanıcı, çoklu cüzdan, döviz kuru — kapsam dışı.

## 3. Kapsam İçi

### Veri
- Gelir & gider kayıtları, sınırsız kategori
- Taksitli alımlar (otomatik aylık plan)
- Tekrarlayan işlemler (günlük/haftalık/aylık/yıllık)
- Bütçeler (aylık, kategori bazlı)
- Hedefler (ilerleme takibi)
- Hatırlatıcılar (tarihli görevler)

### Analiz
- Dashboard: özet kartlar + 4 grafik
- Aylık rapor: kategori kırılımı, günlük trend, top 5 gider, önceki ay karşılaştırma
- Yıllık rapor: aylık karşılaştırma, büyüme, kategori kırılımı

### Dışa Aktarma
- PDF (transactions, monthly, yearly, installments)
- Excel (transactions, monthly, yearly, installments)
- Veritabanı yedekleme / geri yükleme

### Tasarım
- Glassmorphism (cam efekt)
- Karanlık / aydınlık mod (localStorage)
- Responsive (mobil + masaüstü)
- Framer Motion geçişler
- Tam klavye navigasyonu, ARIA

## 4. Kapsam Dışı
- Çoklu kullanıcı, oturum, JWT
- Banka API, döviz kuru
- Mobil uygulama, PWA
- Push bildirim

## 5. Teknik Kararlar
| Alan | Karar |
|------|-------|
| Dağıtım | Monorepo, tek Node.js (Express) + React build statik |
| DB | better-sqlite3 (WAL, FK on) |
| Frontend | React 18 + TS + Vite + Tailwind + Recharts + Framer Motion |
| State | Zustand (UI) + TanStack Query (server) |
| Code-splitting | `React.lazy` ile sayfa bazlı |
| Doğrulama | zod (server) |
| Dışa aktarma | pdfkit + exceljs (server-side) |

## 6. Başarı Kriterleri
- Tüm CRUD < 200ms (yerel DB)
- Dashboard ilk yükleme < 1s
- PDF/Excel dışa aktarma < 3s (1000 satır)
- Lighthouse Accessibility ≥ 90
- Tüm 21 rota HTTP 200

## 7. Milestone Planı

| M | Başlık | Çıktı |
|---|--------|-------|
| M1 | Foundation | Monorepo, DB, API health, UI shell, tema |
| M2 | Core CRUD | Kategoriler, işlemler, dashboard summary |
| M3 | Advanced | Taksit, tekrarlayan, bütçe, hedef, hatırlatıcı |
| M4 | Reports & Exports | Aylık/yıllık raporlar, PDF/Excel |
| M5 | Polish | Animasyonlar, a11y, mobil drawer, code-split, polish |

## 8. Ajan Sorumlulukları

| Milestone | Product Manager | Backend | Frontend |
|-----------|----------------|---------|----------|
| M1 | PRD + DATABASE + DESIGN | DB şeması, migrate, seed, /api/health | Vite+TS+Tailwind, AppShell, Sidebar, Topbar, tema |
| M2 | UAT kriterleri | /api/categories, /api/transactions, dashboard summary | Dashboard kartları + grafik, Transactions sayfası, filtreler, form |
| M3 | Taksit/tekrarlayan/bütçe/hedef kuralları | installmentService, recurringService, endpoints | İlgili sayfalar, InstallmentCalendar, dashboard widget'ları |
| M4 | Rapor şablonları spec | reportService, exportService, endpoints | Reports sayfası + ek grafikler + indirme UI |
| M5 | Kalite çıtası | Performans/validasyon | Animasyonlar, mobil drawer, ErrorBoundary, code-split, README |
