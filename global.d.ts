interface ColumnConfig {
  header: string;
  generator: (index: number, record: Record<string, unknown>) => number | string | boolean;
}
