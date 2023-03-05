import fs from 'node:fs/promises';

import { DATABASE_PATH, DATABASE_SEED_PATH } from './database_paths';

export const initializeDatabase = async () => {
  const t0 = performance.now();
  await fs.copyFile(DATABASE_SEED_PATH, DATABASE_PATH);
  const t1 = performance.now();
  console.log(`[DEBUG]: Database initialize process took ${t1 - t0} milliseconds.`);
};
