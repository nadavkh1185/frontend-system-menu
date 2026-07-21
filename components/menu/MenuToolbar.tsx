"use client";

import { Search, Plus } from "lucide-react";

interface MenuToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onAdd: () => void;
}

export default function MenuToolbar({
  search,
  onSearchChange,
  onExpandAll,
  onCollapseAll,
  onAdd,
}: Readonly<MenuToolbarProps>) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={onExpandAll}
        className="rounded-full bg-[#1D2939] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Expand All
      </button>

      <button
        type="button"
        onClick={onCollapseAll}
        className="rounded-full border border-[#D0D5DD] bg-white px-6 py-2.5 text-sm font-semibold text-[#344054] transition hover:bg-gray-50"
      >
        Collapse All
      </button>

      <div className="relative ml-auto w-full max-w-sm">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800"
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search menu..."
          className="text-black w-full rounded-xl border border-[#D0D5DD] py-3 pl-11 pr-4 outline-none focus:border-[#0051AF]"
        />
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-2 rounded-xl bg-[#0051AF] px-5 py-3 font-semibold text-white transition hover:bg-[#00479A]"
      >
        <Plus size={18} />
        Add Menu
      </button>
    </div>
  );
}
