import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateSchema } from "@/utils/generateSchema";
import { FieldEditor } from "@/components/FieldEditor";
import type { SchemaField } from "@/types/schema";
import { Card, CardContent } from "@/components/ui/card";


export default function SchemaBuilder() {
  const [fields, setFields] = useState<SchemaField[]>([]);

  const handleAddField = (parentPath: number[] = []) => {
    const newField: SchemaField = {
      key: "",
      type: "String",
      children: [],
    };

    if (parentPath.length === 0) {
      setFields([...fields, newField]);
    } else {
      const updatedFields = [...fields];
      let current = updatedFields;
      for (const index of parentPath) {
        current = current[index].children!;
      }
      current.push(newField);
      setFields([...updatedFields]);
    }
  };

  const handleUpdateField = (path: number[], updated: SchemaField) => {
    const updatedFields = [...fields];
    let current = updatedFields;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children!;
    }
    current[path[path.length - 1]] = updated;
    setFields([...updatedFields]);
  };

  const handleDeleteField = (path: number[]) => {
    const updatedFields = [...fields];
    let current = updatedFields;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children!;
    }
    current.splice(path[path.length - 1], 1);
    setFields([...updatedFields]);
  };

  const renderFields = (fields: SchemaField[], path: number[] = []) => {
    return fields.map((field, index) => (
      <FieldEditor
        key={[...path, index].join("-")}
        field={field}
        path={[...path, index]}
        onUpdate={handleUpdateField}
        onDelete={handleDeleteField}
        onAdd={handleAddField}
        renderChildren={renderFields}
      />
    ));
  };

return (
  <main className="p-6 max-w-7xl mx-auto">
    <h1 className="text-2xl font-semibold mb-6">JSON Schema Builder</h1>

    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
      <Card className="w-full md:w-1/2">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Builder</h2>
          <div>{renderFields(fields)}</div>
          <Button className="mt-4" onClick={() => handleAddField()}>
            Add Root Field
          </Button>
        </CardContent>
      </Card>

      <div className="w-full md:w-1/2 flex items-center">
        <Card className="w-full">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">JSON Preview</h2>
            <pre className="bg-muted p-4 rounded overflow-auto text-sm whitespace-pre-wrap">
              {JSON.stringify(generateSchema(fields), null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
);


}
