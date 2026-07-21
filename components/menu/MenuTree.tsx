"use client";

import { useEffect, useMemo, useState } from "react";
import MenuNode from "./MenuNode";
import type { Menu } from "@/types/menu";

interface MenuTreeProps {
  menus: Menu[];
  selectedId: string | null;
  onSelect: (menu: Menu) => void;

  expandAll: boolean;
}

export default function MenuTree({
  menus,
  selectedId,
  onSelect,
  expandAll,
}: Readonly<MenuTreeProps>) {
  const collectIds = (items: Menu[]): string[] => {
    return items.flatMap((item) => [item.id, ...collectIds(item.children)]);
  };

  const allIds = useMemo(() => collectIds(menus), [menus]);

  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (expandAll) {
      setExpanded(new Set(allIds));
    } else {
      setExpanded(new Set());
    }
  }, [expandAll, allIds]);

  const toggleNode = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  if (menus.length === 0) {
    return (
      <div className="rounded-3xl border border-[#E4E7EC] bg-white p-10 text-center text-sm text-[#667085] shadow-sm">
        No menu found.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#E4E7EC] bg-white p-5 shadow-sm">
      {menus.map((menu, index) => (
        <MenuNode
          key={menu.id}
          menu={menu}
          level={0}
          expanded={expanded}
          selectedId={selectedId}
          onToggle={toggleNode}
          onSelect={onSelect}
          isLast={index === menus.length - 1}
          ancestorLast={[]}
        />
      ))}
    </div>
  );
}
