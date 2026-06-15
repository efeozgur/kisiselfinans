# Yerel Finance — Kişisel Finans Takip Uygulaması

Modern, **glassmorphism** tasarımlı, karanlık/aydınlık mod destekli kişisel gelir-gider takip uygulaması. Taksit, tekrarlayan işlem, bütçe, hedef ve rapor modülleri ile eksiksiz bir "kişisel CFO" deneyimi.

![Tech](https://img.shields.io/badge/React-18-61dafb) ![Tech](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tech](https://img.shields.io/badge/Vite-5-646cff) ![Tech](https://img.shields.io/badge/Tailwind-3-38bdf8) ![Tech](https://img.shields.io/badge/Node-20-339933) ![Tech](https://img.shields.io/badge/SQLite-3-003b57)

---

## ✨ Özellikler

### 📊 Dashboard
- Bu ay gelir / gider / net kartları
- Toplam varlık ve yükümlülük özeti
- Yaklaşan taksitler & hatırlatıcılar widget'ları
- 4 grafik: **Gelir vs Gider**, **Kategori Dağılımı**, **Nakit Akışı**, **Aylık Trend**
- Son 10 işlem listesi

### 💸 İşlem Yönetimi
- Gelir & gider CRUD, sınırsız kategori
- Gelişmiş filtreleme: tarih aralığı, kategori, tip, tutar, serbest metin araması
- Filtreye göre dinamik gelir/gider/net toplamları
- Hem masaüstü tablo hem mobil kart görünümü

### 📅 Taksit Sistemi
- Toplam tutar + taksit sayısı + başlangıç ayı → **otomatik aylık plan**
- Kuruş yuvarlaması: toplam kayıp yok
- Her taksit için ödeme / geri alma
- Vadesi geçmiş taksitler otomatik işaretlenir
- Taksit takvimi (InstallmentCalendar) ile tam görünüm

### 🔁 Tekrarlayan İşlemler
- Günlük / haftalık / aylık / yıllık periyotlar
- Uygulama açılışında otomatik çalıştırma
- Manuel "Şimdi Çalıştır" butonu
- Bitiş tarihi desteği, otomatik pasifleştirme

### 💰 Bütçeler
- Aylık kategori bazlı bütçe
- Anlık harcanan / kalan / kullanım yüzdesi
- Aşım uyarıları (gauge + renk değişimi)
- Birden fazla kategori tek sayfada

### 🎯 Hedefler
- Hedef tutar, mevcut birikim, hedef tarih
- Görsel ilerleme çubuğu
- Tamamlanınca trophy rozeti
- Delta veya set ile ilerleme güncelleme

### ⏰ Hatırlatıcılar
- Tarihli görevler ve faturalar
- Tür etiketleri (fatura, hedef, genel)
- Tamamlandı işaretleme, gecikmiş rozeti

### 📈 Raporlar
- **Aylık**: gelir/gider, kategori kırılımı, günlük trend, en büyük 5 gider, önceki ay karşılaştırma
- **Yıllık**: aylık karşılaştırma, yıllık büyüme, kategori kırılımı

### 📤 Dışa Aktarma
- **PDF** (pdfkit, sunucu tarafı, Türkçe karakterler)
- **Excel** (exceljs, formatlı)
- İşlemler, aylık/yıllık raporlar, taksit planları

### ⚙️ Ayarlar
- Kategori yönetimi (renk seçici, arşivleme)
- Karanlık / aydınlık mod toggle (localStorage persist)
- **Veritabanı yedekleme** (SQLite dosyası indir)
- **Veritabanı geri yükleme** (otomatik .bak oluşturur)

### 🎨 Tasarım
- **Glassmorphism** (cam efekt, blur, saydam arka plan)
- Karanlık / aydınlık mod (CSS değişkenleri + Tailwind dark)
- Framer Motion ile akıcı geçişler
- Tam responsive (mobil drawer + masaüstü collapse)
- Inter font, WCAG AA kontrast hedefi
- `prefers-reduced-motion` desteği

---

## 🛠 Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Ön yüz framework | React 18 + TypeScript |
| Build | Vite 5 (code-splitting) |
| Stil | Tailwind CSS 3 (glassmorphism utility'leri) |
| Grafik | Recharts 2 |
| Animasyon | Framer Motion 11 |
| Server state | TanStack Query 5 |
| UI state | Zustand 4 |
| Routing | React Router 6 |
| İkon | lucide-react |
| Backend | Node.js 20 + Express 4 |
| DB | better-sqlite3 11 (WAL mode, FK on) |
| Doğrulama | zod |
| PDF | pdfkit |
| Excel | exceljs |
| Tarih | date-fns |

---

## 📁 Klasör Yapısı

```
yerelmodel/
├── package.json              # concurrently ile client+server
├── tsconfig.base.json
├── server/
│   ├── src/
│   │   ├── index.ts          # Express bootstrap
│   │   ├── db/
│   │   │   ├── schema.sql    # SQLite şeması
│   │   │   ├── connection.ts
│   │   │   ├── migrate.ts
│   │   │   └── seed.ts       # 15 varsayılan kategori
│   │   ├── routes/           # 10 router
│   │   ├── services/         # 7 iş mantığı modülü
│   │   ├── middleware/       # validate, errorHandler
│   │   ├── types/            # domain tipleri
│   │   ├── utils/            # date, currency
│   │   └── scripts/copy-assets.mjs
│   └── data/                 # finance.db (gitignore)
├── client/
│   ├── src/
│   │   ├── App.tsx           # router + lazy pages
│   │   ├── main.tsx
│   │   ├── api/              # client + hooks
│   │   ├── components/
│   │   │   ├── layout/       # AppShell, Sidebar, MobileSidebar, Topbar, ThemeToggle
│   │   │   ├── ui/           # Card, Button, Input, Modal, Toast, ProgressBar
│   │   │   ├── charts/       # 5 chart bileşeni
│   │   │   ├── transactions/
│   │   │   └── installments/
│   │   ├── pages/            # 8 sayfa (lazy)
│   │   ├── stores/           # theme + ui
│   │   ├── lib/              # format, utils
│   │   ├── styles/           # tokens.css + globals.css
│   │   └── types/
│   └── public/favicon.svg
└── docs/
    ├── PRD.md
    ├── DATABASE.md
    ├── API.md
    └── DESIGN.md
```

---

## 🚀 Kurulum ve Çalıştırma

### Geliştirme (Önerilen)

```bash
# 1) Tüm bağımlılıkları kur
npm run install:all

# 2) Hem istemci hem sunucuyu birlikte başlat
npm run dev
```

Açılan adresler:
- **Uygulama:** http://localhost:5173 (Vite dev server, /api → 3000'e proxy)
- **API:** http://localhost:3000/api

### Üretim Build

```bash
# Build
npm run build
# İstemci → server/public/ altına derlenir

# Çalıştır (sadece Node, statik dosyaları da sunar)
npm start
```

Açılan adres: **http://localhost:3000** (hem API hem SPA)

### Çevre Değişkenleri

`.env.example` → `.env` olarak kopyala, isteğe göre düzenle:

```env
PORT=3000
DB_PATH=./data/finance.db   # mutlak veya göreceli yol
NODE_ENV=development
```

---

## 📊 API Özeti

Tüm uç noktalar `/api` altında, JSON formatında. Tam referans: [`docs/API.md`](docs/API.md).

| Method | Path | Amaç |
|--------|------|------|
| GET | `/api/health` | Sağlık kontrolü |
| GET | `/api/dashboard` | Dashboard özet + grafik verileri |
| GET/POST/PATCH/DELETE | `/api/categories` | Kategori CRUD |
| GET/POST/PATCH/DELETE | `/api/transactions` | İşlem CRUD + filtreleme |
| GET/POST/PATCH/DELETE | `/api/installments` | Taksit planı CRUD |
| POST | `/api/installments/:id/pay/:paymentId` | Taksit ödemesi |
| POST | `/api/installments/:id/unpay/:paymentId` | Ödemeyi geri al |
| GET/POST/PATCH/DELETE | `/api/recurring` | Tekrarlayan işlem CRUD |
| POST | `/api/recurring/run` | Manuel runner |
| GET/POST/PATCH/DELETE | `/api/budgets?month=YYYY-MM` | Bütçe |
| GET/POST/PATCH/DELETE | `/api/goals` | Hedefler |
| POST | `/api/goals/:id/progress` | İlerleme güncelle |
| GET/POST/PATCH/DELETE | `/api/reminders` | Hatırlatıcılar |
| GET | `/api/reports/monthly?year&month` | Aylık rapor |
| GET | `/api/reports/yearly?year` | Yıllık rapor |
| GET | `/api/export/transactions.pdf\|xlsx?dateFrom&dateTo` | Dışa aktar |
| GET | `/api/export/report.pdf\|xlsx?type=monthly\|yearly&...` | Rapor dışa aktar |
| GET | `/api/export/installments.pdf\|xlsx` | Taksit dışa aktar |
| GET/PATCH | `/api/settings` | Ayarlar |
| GET | `/api/settings/backup` | DB yedek indir |
| POST | `/api/settings/restore` | DB geri yükle |

---

## 🗄 Veritabanı

11 tablo, otomatik migration, ilk açılışta seed:

- `categories` (15 varsayılan)
- `transactions` (indeksli: date, category_id, type+date)
- `installments`, `installment_payments` (CASCADE)
- `recurring_transactions` (indeksli: next_run_date, is_active)
- `budgets` (UNIQUE(category_id, month))
- `goals`
- `reminders` (indeksli: due_date)
- `settings` (anahtar-değer)
- `_migrations`

Şema detayları: [`docs/DATABASE.md`](docs/DATABASE.md).

---

## 🎨 Tasarım Sistemi

`client/src/styles/tokens.css` üzerinden tanımlı:
- **Renkler:** indigo-600 primary, emerald-500 gelir, rose-500 gider, amber-500 uyarı
- **Glass:** `rgba(255,255,255,0.6)` light / `rgba(30,41,59,0.4)` dark + `backdrop-blur(16px) saturate(140%)`
- **Tipografi:** Inter 400/500/600/700/800
- **Animasyon:** 200ms ease-out, Framer Motion sayfa geçişleri
- **Erişilebilirlik:** `focus-visible` halkası, ARIA etiketleri, `prefers-reduced-motion` desteği

Detaylar: [`docs/DESIGN.md`](docs/DESIGN.md).

---

## 🧪 Doğrulama

Her milestone'da otomatik test:

```bash
# Server build
cd server && npm run build

# Client type-check + build
cd client && npx tsc --noEmit && npm run build

# Tüm rotalar yeşil mi?
npm start &
sleep 2
curl http://localhost:3000/api/health
# → {"ok":true,...}
```

M5 sonunda tüm 21 rota (10 API + 1 sağlık + 1 dashboard + 9 SPA) **HTTP 200** döner.

---

## 📜 Lisans

MIT
