"use client";

import ReactMarkdown from "react-markdown";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
}

export default function MarkdownField({
  id,
  label,
  value,
  onChange,
  onBlur,
  name,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Textarea
          id={id}
          name={name}
          rows={10}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
        <div className="overflow-y-auto rounded-xs border border-input p-3 text-sm [&_h2]:mt-3 [&_h2]:mb-1 [&_p]:mb-2">
          <ReactMarkdown>{value || "*Nothing to preview yet.*"}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
