import { faker } from '@faker-js/faker';

const columns: ColumnConfig[] = [
  {
    header: 'id',
    generator: (i) => i + 1,
  },
  {
    header: 'firstName',
    generator: () => faker.person.firstName()
  },
  {
    header: 'lastName',
    generator: () => faker.person.lastName()
  },
];

export default columns;
