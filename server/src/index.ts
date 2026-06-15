import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { existsSync } from 'node:fs';

import { runMigrations } from './db/migrate.js';
import { runSeed } from './db/seed.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { healthRouter } from './routes/health.js';
import { transactionsRouter } from './routes/transactions.js';
import { categoriesRouter } from './routes/categories.js';
import { installmentsRouter } from './routes/installments.js';
import { recurringRouter } from './routes/recurring.js';
import { budgetsRouter } from './routes/budgets.js';
import { goalsRouter } from './routes/goals.js';
import { remindersRouter } from './routes/reminders.js';
import { reportsRouter } from './routes/reports.js';
import { settingsRouter } from './routes/settings.js';
import { dashboardRouter } from './routes/dashboard.js';
import { exportRouter } from './routes/export.js';
import { runRecurring } from './services/recurringService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = Number(process.env.PORT ?? 3000);
const app = express();

// Middleware
app.use(cors());
// Settings restore için octet-stream'i raw buffer olarak al
app.use('/api/settings/restore', express.raw({ type: 'application/octet-stream', limit: '50mb' }));
app.use(express.json({ limit: '5mb' }));

// DB hazırla + seed
runMigrations();
runSeed();

// Recurring transaction'ları uygulama açılışında bir defa çalıştır
try {
  const result = runRecurring();
  if (result.generated > 0) {
    console.log(`[startup] recurring runner: ${result.generated} işlem üretildi`);
  }
} catch (e) {
  console.error('[startup] recurring runner hatası:', e);
}

// API
app.use('/api', healthRouter);
app.use('/api', dashboardRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/installments', installmentsRouter);
app.use('/api/recurring', recurringRouter);
app.use('/api/budgets', budgetsRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/reminders', remindersRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/export', exportRouter);

// Statik ön yüz (build sonrası server/public/ klasörü)
const publicDir = resolve(__dirname, '../public');
if (existsSync(publicDir)) {
  app.use(express.static(publicDir));
  // SPA fallback — bilinmeyen rotalar index.html'e düşsün (ama /api hariç)
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(join(publicDir, 'index.html'));
  });
  console.log(`[server] statik dizin sunuluyor: ${publicDir}`);
} else {
  console.log('[server] public/ bulunamadı, sadece API modu');
}

// 404 + hata yakalama
app.use('/api', notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✓ Yerel Finance API → http://localhost:${PORT}`);
  console.log(`  Health: http://localhost:${PORT}/api/health`);
});
