"use client";

import type { Menu } from "@/types/menu";

interface DetailPanelProps {
  menu: Menu | null;
  name: string;
  parentName: string;

  onNameChange: (value: string) => void;

  onSave: () => void;
  onCreateChild: () => void;
  onDelete: () => void;
}

export default function DetailPanel({
  menu,
  name,
  parentName,
  onNameChange,
  onSave,
  onCreateChild,
  onDelete,
}: Readonly<DetailPanelProps>) {
  if (!menu) {
    return (
      <div className="rounded-3xl border border-[#E4E7EC] bg-white p-8 shadow-sm">
        <div className="flex h-[420px] items-center justify-center text-sm text-[#98A2B3]">
          Select a menu from the tree
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#E4E7EC] bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-xl font-bold text-[#101828]">Menu Detail</h2>

      <div className="space-y-6 text-black">
        <Field label="Menu ID" value={menu.id} readOnly />

        <Field label="Menu Name" value={name} onChange={onNameChange} />

        <Field label="Parent" value={parentName} readOnly />

        <Field
          label="Created At"
          value={new Date(menu.createdAt).toLocaleString()}
          readOnly
        />

        <Field
          label="Updated At"
          value={new Date(menu.updatedAt).toLocaleString()}
          readOnly
        />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <button
          onClick={onSave}
          className="rounded-full bg-[#4700AF] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Save
        </button>

        <button
          onClick={onCreateChild}
          className="rounded-full border border-[#D0D5DD] bg-white px-6 py-3 text-sm font-semibold text-[#344054] hover:bg-gray-50"
        >
          Create Child
        </button>

        <button
          onClick={onDelete}
          className="rounded-full border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

function Field({
  label,
  value,
  readOnly = false,
  onChange,
}: Readonly<FieldProps>) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#344054]">
        {label}
      </label>

      <input
        type="text"
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        className={`h-11 w-full rounded-2xl border px-4 text-sm outline-none ${
          readOnly
            ? "border-[#EAECF0] bg-[#F9FAFB] text-[#667085]"
            : "border-[#D0D5DD] bg-white focus:border-[#0051AF]"
        }`}
      />
    </div>
  );
}
