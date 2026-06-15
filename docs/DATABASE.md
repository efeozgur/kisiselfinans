# Veritabanı Şeması (SQLite)

## Tablolar

### `categories` — Gelir & gider kategorileri
| Sütun | Tip | Not |
|-------|-----|-----|
| id | INTEGER PK | |
| name | TEXT NOT NULL | |
| type | TEXT NOT NULL | `income` \| `expense` |
| color | TEXT | hex kodu, UI rozetleri için |
| icon | TEXT | lucide-react ikon adı |
| is_archived | INTEGER DEFAULT 0 | |
| created_at | TEXT DEFAULT now | |

### `transactions` — Gelir & gider işlemleri
| Sütun | Tip | Not |
|-------|-----|-----|
| id | INTEGER PK | |
| type | TEXT NOT NULL | `income` \| `expense` |
| amount | REAL NOT NULL (>0) | |
| category_id | FK → categories | |
| description, notes | TEXT | |
| date | TEXT NOT NULL | ISO YYYY-MM-DD |
| installment_id | FK → installments | ödeme transaction'ı ise bağlı |
| recurring_id | FK → recurring_transactions | |
| created_at | TEXT DEFAULT now | |

İndeksler: `date`, `category_id`, `(type, date)`.

### `installments` — Taksitli alımlar
| Sütun | Tip | Not |
|-------|-----|-----|
| id | INTEGER PK | |
| name | TEXT NOT NULL | örn. "Dizüstü Bilgisayar" |
| total_amount | REAL NOT NULL (>0) | |
| installment_count | INTEGER NOT NULL (>0) | |
| installment_amount | REAL NOT NULL | (kuruş yuvarlama dahil) |
| start_date | TEXT NOT NULL | ilk taksit ayı |
| category_id | FK → categories | |
| notes | TEXT | |

### `installment_payments` — Her ay için bir satır
| Sütun | Tip | Not |
|-------|-----|-----|
| id | INTEGER PK | |
| installment_id | FK → installments (CASCADE) | |
| sequence | INTEGER | 1..N |
| due_date | TEXT NOT NULL | |
| amount | REAL NOT NULL | |
| is_paid | INTEGER DEFAULT 0 | |
| paid_date | TEXT | |
| paid_transaction_id | FK → transactions | ödeme yapıldığında bağlanır |

### `recurring_transactions` — Tekrarlayan işlemler
| Sütun | Tip | Not |
|-------|-----|-----|
| id | INTEGER PK | |
| type, amount, category_id, description, notes | ... | |
| frequency | TEXT NOT NULL | `daily` \| `weekly` \| `monthly` \| `yearly` |
| start_date | TEXT NOT NULL | |
| end_date | TEXT | opsiyonel |
| next_run_date | TEXT NOT NULL | runner buradan okur |
| is_active | INTEGER DEFAULT 1 | |

### `budgets` — Aylık bütçeler
`UNIQUE(category_id, month)` — ay başına bir kategori tek bütçe.

### `goals` — Finansal hedefler
`target_amount`, `current_amount`, `target_date`, `is_completed`.

### `reminders` — Hatırlatıcılar
`title`, `due_date`, `amount?`, `type?` (`bill`, `goal`, `custom`), `is_done`.

### `settings` — Anahtar-değer ayarları
Varsayılanlar: `theme`, `currency`, `locale`, `first_day_of_week`.

### `_migrations` — Migration kaydı
Hangi migration'lar uygulandı.

## Taksit Üretim Algoritması
1. `total / count` → baz tutar
2. Kuruş artığı ilk taksite eklenir (toplam kayıp olmasın)
3. `start_date`'ten itibaren her ay aynı gün → `installment_payments` satırları
4. Henüz vadesi gelmemiş taksitler için `transactions` oluşturulmaz
5. Ödeme akışı: `POST /api/installments/:id/pay/:paymentId` → transaction oluşturur + payment `is_paid=1`

## Tekrarlayan Üretici
Uygulama açılışında `next_run_date <= today` olan kayıtlar için transaction üretir, `next_run_date` ileri sarar.

## Migration
- `server/src/db/schema.sql` ilk kurulumda uygulanır
- `server/src/db/migrations/*.sql` ek değişiklikler için (sıralı)
- `_migrations` tablosu idempotent takip sağlar
