interface ColumnConfig {
  header: string;
  generator: (index: number) => number | string | boolean;
}
