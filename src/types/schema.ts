export type FieldType = "String" | "Number" | "Nested";

export interface SchemaField {
  key: string;
  type: FieldType;
  children?: SchemaField[];
}