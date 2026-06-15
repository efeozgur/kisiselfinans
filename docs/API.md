# API Referansı

Tüm uç noktalar JSON. Tek kullanıcı, oturum yok.

## Sağlık
- `GET /api/health` → `{ ok: boolean, time: ISO }`

## Dashboard
- `GET /api/dashboard` → bu ay gelir/gider/net, toplam varlık/borç, yaklaşan taksitler, hatırlatıcılar, grafik verileri

## Kategoriler
- `GET /api/categories?type=income|expense`
- `POST /api/categories` `{ name, type, color?, icon? }`
- `PATCH /api/categories/:id`
- `DELETE /api/categories/:id`

## İşlemler
- `GET /api/transactions?dateFrom=&dateTo=&categoryId=&type=&q=&min=&max=&limit=&offset=`
- `GET /api/transactions/:id`
- `POST /api/transactions` `{ type, amount, categoryId?, description?, notes?, date }`
- `PATCH /api/transactions/:id`
- `DELETE /api/transactions/:id`

## Taksitler
- `GET /api/installments`
- `GET /api/installments/:id` (payments ile birlikte)
- `POST /api/installments` `{ name, totalAmount, installmentCount, startDate, categoryId?, notes? }`
- `PATCH /api/installments/:id`
- `DELETE /api/installments/:id`
- `POST /api/installments/:id/pay/:paymentId` `{ date? }` → transaction oluşturur, payment `is_paid=1`

## Tekrarlayan
- `GET /api/recurring`
- `POST /api/recurring` `{ type, amount, categoryId?, description?, notes?, frequency, startDate, endDate? }`
- `PATCH /api/recurring/:id`
- `DELETE /api/recurring/:id`
- `POST /api/recurring/run` → `next_run_date <= today` olanlar için transaction üretir

## Bütçeler
- `GET /api/budgets?month=YYYY-MM`
- `POST /api/budgets` `{ categoryId, amount, month, notes? }`
- `PATCH /api/budgets/:id`
- `DELETE /api/budgets/:id`

## Hedefler
- `GET /api/goals`
- `POST /api/goals` `{ name, targetAmount, currentAmount?, targetDate?, notes? }`
- `PATCH /api/goals/:id`
- `POST /api/goals/:id/progress` `{ delta }` — current_amount günceller
- `DELETE /api/goals/:id`

## Hatırlatıcılar
- `GET /api/reminders`
- `POST /api/reminders` `{ title, dueDate, amount?, type?, notes? }`
- `PATCH /api/reminders/:id`
- `DELETE /api/reminders/:id`

## Raporlar
- `GET /api/reports/monthly?year=YYYY&month=MM`
- `GET /api/reports/yearly?year=YYYY`

## Dışa Aktarma
- `GET /api/export/transactions.pdf?dateFrom=&dateTo=...`
- `GET /api/export/transactions.xlsx?dateFrom=&dateTo=...`
- `GET /api/export/installments.pdf`
- `GET /api/export/installments.xlsx`
- `GET /api/export/report.pdf?type=monthly|yearly&...`
- `GET /api/export/report.xlsx?type=monthly|yearly&...`

## Ayarlar
- `GET /api/settings` → tüm key/value
- `PATCH /api/settings` `{ key, value }`
- `POST /api/settings/backup` → `finance.db` indir
- `POST /api/settings/restore` (multipart) → geri yükle

## Hata Yanıtı
```json
{ "error": "Mesaj", "details": {...} }
```
- 400 → doğrulama hatası
- 404 → bulunamadı
- 500 → sunucu hatası
