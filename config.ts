import { faker } from '@faker-js/faker';
import { generateSentimentParagraphs } from 'tools';

const operators = Array.from({ length: 10 }, () => faker.person.fullName())

const columns: ColumnConfig[] = [
  { header: 'ID', generator: (i) => i + 1 },
  { header: 'Date', generator: () => faker.date.past({ years: 2 }).toISOString() },
  { header: 'First Name', generator: () => faker.person.firstName() },
  { header: 'Last Name', generator: () => faker.person.lastName() },
  { header: 'Operator', generator: () => faker.helpers.arrayElement(operators) },
  { header: 'Resolution Time', generator: () => faker.number.int({ min: 60 * 2, max: 60 * 60 }) },
  { header: 'Hold Time', generator: () => faker.number.int({ min: 60 * 1, max: 60 * 30 }) },
  { header: 'Escalated', generator: () => faker.datatype.boolean() },
  { header: 'CSAT', generator: () => faker.number.int({ min: 1, max: 5 }) },
  { header: 'Feedback', generator: (i, record) => generateSentimentParagraphs(record['CSAT'] as number / 5) },
];

export default columns;
