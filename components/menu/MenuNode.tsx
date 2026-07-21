"use client";

import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  FileText,
} from "lucide-react";
import type { Menu } from "@/types/menu";

interface MenuNodeProps {
  menu: Menu;
  level: number;
  expanded: Set<string>;
  selectedId: string | null;

  onToggle: (id: string) => void;
  onSelect: (menu: Menu) => void;

  isLast?: boolean;
  ancestorLast?: boolean[];
}

export default function MenuNode({
  menu,
  level,
  expanded,
  selectedId,
  onToggle,
  onSelect,
  isLast = true,
  ancestorLast = [],
}: Readonly<MenuNodeProps>) {
  const hasChildren = menu.children.length > 0;
  const isExpanded = expanded.has(menu.id);
  const isSelected = selectedId === menu.id;

  return (
    <>
      <div
        className={`flex h-9 items-center rounded-md transition ${
          isSelected ? "bg-[#EEF4FF] text-[#0051AF]" : "hover:bg-[#F8FAFC]"
        }`}
        onClick={() => onSelect(menu)}
      >
        {/* Indent Columns */}
        {ancestorLast.map((last, index) => (
          <div key={index} className="relative h-9 w-5 flex-shrink-0">
            {!last && (
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#D0D5DD]" />
            )}
          </div>
        ))}

        {/* Current Branch */}
        {level > 0 && (
          <div className="relative h-9 w-5 flex-shrink-0">
            {!isLast && (
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#D0D5DD]" />
            )}

            <div className="absolute left-1/2 top-1/2 h-px w-5 -translate-y-1/2 bg-[#D0D5DD]" />

            {isLast && (
              <div className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-[#D0D5DD]" />
            )}
          </div>
        )}

        {/* Expand Button */}
        <div className="flex w-5 items-center justify-center">
          {hasChildren ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(menu.id);
              }}
              className="rounded hover:bg-[#F2F4F7]"
            >
              {isExpanded ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </button>
          ) : (
            <span className="w-[14px]" />
          )}
        </div>

        {/* Label */}
        <div className="ml-2 flex items-center gap-2">
          {hasChildren ? (
            isExpanded ? (
              <FolderOpen size={16} className="text-[#0051AF]" />
            ) : (
              <Folder size={16} className="text-[#0051AF]" />
            )
          ) : (
            <FileText size={15} className="text-[#98A2B3]" />
          )}

          <span className="text-black text-sm font-medium">{menu.name}</span>
        </div>
      </div>

      {hasChildren &&
        isExpanded &&
        menu.children.map((child, index) => (
          <MenuNode
            key={child.id}
            menu={child}
            level={level + 1}
            expanded={expanded}
            selectedId={selectedId}
            onToggle={onToggle}
            onSelect={onSelect}
            isLast={index === menu.children.length - 1}
            ancestorLast={[...ancestorLast, isLast]}
          />
        ))}
    </>
  );
}
