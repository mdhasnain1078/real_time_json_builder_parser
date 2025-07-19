import type { SchemaField } from "@/types/schema";

export function generateSchema(fields: SchemaField[]): any {
  const schema: any = {};
  for (const field of fields) {
    if (field.type === "Nested") {
      schema[field.key] = generateSchema(field.children || []);
    } else {
      schema[field.key] = field.type;
    }
  }
  return schema;
}
















