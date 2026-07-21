"use client";

import { ChevronDown } from "lucide-react";

interface MenuDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function MenuDropdown({
  value,
  options,
  onChange,
}: Readonly<MenuDropdownProps>) {
  return (
    <div className="max-w-sm">
      <label className="mb-2 block text-sm font-medium text-[#344054]">
        Menu
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none rounded-2xl border border-[#D0D5DD] bg-white px-4 pr-10 text-sm text-[#101828] shadow-sm outline-none transition focus:border-[#0051AF]"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"
        />
      </div>
    </div>
  );
}
