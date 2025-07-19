import type { SchemaField, FieldType } from "@/types/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import React from "react";

interface FieldEditorProps {
  field: SchemaField;
  path: number[];
  onUpdate: (path: number[], updated: SchemaField) => void;
  onDelete: (path: number[]) => void;
  onAdd: (path: number[]) => void;
  renderChildren: (children: SchemaField[], path: number[]) => React.ReactNode;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({
  field,
  path,
  onUpdate,
  onDelete,
  onAdd,
  renderChildren,
}) => {
  return (
    <Card className="mb-2 ml-4">
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Field name"
            value={field.key}
            onChange={(e) =>
              onUpdate(path, {
                ...field,
                key: e.target.value,
              })
            }
          />
          <Select
            value={field.type}
            onValueChange={(value) =>
              onUpdate(path, {
                ...field,
                type: value as FieldType,
                children: value === "Nested" ? field.children || [] : undefined,
              })
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="String">String</SelectItem>
              <SelectItem value="Number">Number</SelectItem>
              <SelectItem value="Nested">Nested</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => onDelete(path)}>
            Delete
          </Button>
        </div>
        {field.type === "Nested" && (
          <div className="ml-4">
            {renderChildren(field.children || [], path)}
            <Button onClick={() => onAdd(path)} className="mt-2" variant="secondary">
              Add Nested Field
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
