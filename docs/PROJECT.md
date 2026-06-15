# Proje Süreç Notları

## 2026-06-16 — PDF Çıktı Türkçe Karakter Sorunu

### Problem
PDF çıktılarında Türkçe karakterler (ı, İ, ğ, ş, ç, ö, ü, ₺) düzgün görüntülenmiyordu. PDFKit varsayılan olarak Helvetica kullanıyor ve bu font Türkçe karakterleri desteklemiyor.

### Çözüm Süreci

1. **İlk deneme — DejaVuSans**
   - `server/src/services/exportService.ts` dosyasında `PDFDocument` fontu olarak `DejaVuSans.ttf` kaydedildi
   - Tüm Windows sistemlerde hazır olmadığı için bazı bilgisayarlarda font hatası verdi

2. **İkinci deneme — Arial** ✓
   - Tüm Windows kurulumlarında bulunan Arial fontuna geçildi
   - `arial.ttf` ve `arialbd.ttf` kullanıldı
   - Evrensel uyumluluk sağlandı

### Uygulanan Değişiklikler

**Commit:** `280ce21` — fix: switch to Arial font for universal Windows Turkish support

`server/src/services/exportService.ts`:
```typescript
const FONT_NORMAL = path.join(process.env.WINDIR ?? 'C:\\Windows', 'Fonts', 'arial.ttf');
const FONT_BOLD   = path.join(process.env.WINDIR ?? 'C:\\Windows', 'Fonts', 'arialbd.ttf');
```

Her PDF export fonksiyonunda (`exportTransactionsPdf`, `exportReportPdf`, `exportInstallmentsPdf`):
```typescript
doc.registerFont('DejaVuSans', FONT_NORMAL).registerFont('DejaVuSans-Bold', FONT_BOLD);
doc.font('DejaVuSans');
```

### Sonraki İyileştirmeler

**Commit:** `ec8fbff` — fix: align category breakdown amounts to the right in PDF report
- Kategori kırılımındaki para miktarları sağa hizalandı

**Commit:** `96886d0` — fix: center category breakdown block in PDF report
- Kategori kırılımı bloğu sayfa ortasına hizalandı
- Toplam genişlik ~390px, A4 sayfa üzerinde ortalanarak konumlandırıldı

**Commit:** `0e12cd1` — fix: remove category breakdown header in PDF report
- "Kategori Kırılımı" başlığı kaldırıldı

### Öğrenilen Dersler

- PDFKit'te varsayılan Helvetica/Times-Roman fontları Türkçe karakter desteklemez
- Windows sistem fontu seçerken evrensel dağıtım için Arial tercih edilmeli
- `process.env.WINDIR` ile Windows path'i güvenli şekilde alınabilir, yoksa `C:\\Windows` fallback olarak kullanılır
- Proxy hatası alan bilgisayarlarda `git config --global http.https://github.com.proxy ""` ile proxy atlanabilir
