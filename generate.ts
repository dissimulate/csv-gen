import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createObjectCsvWriter } from 'csv-writer';
import columnsRaw from './config';

// Type check the config at import time
const columns: ColumnConfig[] = columnsRaw;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const rowCount = parseInt(args[0], 10);
const filename = args[1];

if (!rowCount || !filename) {
  console.error('Usage: npm run gen <rowCount> <filename>');
  console.error('Example: npm run gen 1000 users');
  process.exit(1);
}

if (isNaN(rowCount) || rowCount <= 0) {
  console.error('Row count must be a positive number');
  process.exit(1);
}

const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, `${filename}.csv`);

async function generateCSV() {
  console.log(`Generating ${rowCount} rows...`);

  const headers = columns.map(col => ({ id: String(col.header), title: String(col.header) }));

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: headers
  });

  const records = [];
  for (let i = 0; i < rowCount; i++) {
    const record: any = {};
    columns.forEach(col => {
      record[String(col.header)] = col.generator(i);
    });
    records.push(record);
  }

  try {
    await csvWriter.writeRecords(records);
    console.log(`CSV generated successfully: ${outputPath}`);
    console.log(`Total rows: ${rowCount}`);
    console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('Error generating CSV:', error);
    process.exit(1);
  }
}

generateCSV();
