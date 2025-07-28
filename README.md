# CSV Generator

A lightweight npm tool that uses Faker.js to generate CSV files with customizable data.

## Usage

```bash
npm run gen <rowCount> <filename>
```

Example:
```bash
npm run gen 1000 users
```

This will generate a file at `output/users.csv` with 1000 rows of fake data.

## Configuration

Edit `config.ts` to customize the columns and data generation:

```typescript
export const columns: ColumnConfig[] = [
  {
    header: 'id',
    generator: () => faker.string.uuid()
  },
  {
    header: 'firstName', 
    generator: () => faker.person.firstName()
  },
  // Add more columns as needed
];
```

## Installation

```bash
npm install
```

The tool includes TypeScript support and uses:
- @faker-js/faker for data generation
- csv-writer for CSV formatting
- tsx for TypeScript execution