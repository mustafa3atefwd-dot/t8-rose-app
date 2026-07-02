"use client";

import * as React from "react";
import { UploadIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { FieldShell, type FieldStateProps } from "./field-shell";

/** Does `file` satisfy an `accept` string (".png,image/*,application/pdf")? */
function fileMatchesAccept(file: File, accept?: string) {
  if (!accept) return true;
  const tokens = accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  if (tokens.length === 0) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return tokens.some((token) => {
    if (token.startsWith(".")) return name.endsWith(token);
    if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
    return type === token;
  });
}

type FileInputProps = FieldStateProps & {
  accept?: string;
  multiple?: boolean;
  /** Max size per file, in bytes. */
  maxSize?: number;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
  /** Called with a reason key when validation fails ("type" | "size"). */
  onError?: (reason: "type" | "size", file: File) => void;
  placeholder?: string;
  uploadLabel?: string;
  className?: string;
  id?: string;
  name?: string;
};

/** Custom file trigger showing the filename, with click and drag-and-drop. */
function FileInput({
  accept,
  multiple,
  maxSize,
  disabled,
  invalid,
  success,
  onFilesChange,
  onError,
  placeholder = "No file selected",
  uploadLabel = "Upload file",
  className,
  id,
  name,
}: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [dragOver, setDragOver] = React.useState(false);

  const ingest = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    for (const file of incoming) {
      if (!fileMatchesAccept(file, accept)) {
        onError?.("type", file);
        return;
      }
      if (maxSize != null && file.size > maxSize) {
        onError?.("size", file);
        return;
      }
    }
    const next = multiple ? incoming : incoming.slice(0, 1);
    setFiles(next);
    onFilesChange?.(next);
  };

  const open = () => {
    if (!disabled) inputRef.current?.click();
  };

  const label =
    files.length === 0
      ? placeholder
      : files.length === 1
        ? files[0].name
        : `${files.length} files selected`;

  return (
    <FieldShell
      invalid={invalid}
      success={success}
      disabled={disabled}
      data-drag-over={dragOver || undefined}
      className={cn(
        "cursor-pointer data-[drag-over=true]:border-ds-border-primary data-[drag-over=true]:bg-ds-bg-primary-fade",
        className,
      )}
      onClick={open}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (!disabled) ingest(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => ingest(e.target.files)}
      />
      <span
        className={cn(
          "grow truncate text-start",
          files.length === 0 ? "text-ds-text-muted" : "text-ds-text-plain",
        )}
      >
        {label}
      </span>
      <span className="flex shrink-0 items-center gap-1.5 text-body-sm font-medium text-ds-text-primary">
        <UploadIcon className="size-4" aria-hidden />
        {uploadLabel}
      </span>
    </FieldShell>
  );
}

export { FileInput, fileMatchesAccept };
export type { FileInputProps };
