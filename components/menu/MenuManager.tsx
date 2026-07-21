"use client";

import { useEffect, useMemo, useState } from "react";

import type { Menu } from "@/types/menu";
import { api } from "@/lib/api";

import MenuDropdown from "./MenuDropdown";
import MenuToolbar from "./MenuToolbar";
import MenuTree from "./MenuTree";
import DetailPanel from "./DetailPanel";
import MenuModal from "./MenuModal";
import { toast } from "sonner";

function flattenMenus(
  menus: Menu[],
  level = 0,
): Array<{ id: string; name: string }> {
  const result: Array<{ id: string; name: string }> = [];

  for (const menu of menus) {
    result.push({
      id: menu.id,
      name: `${"— ".repeat(level)}${menu.name}`,
    });

    if (menu.children.length > 0) {
      result.push(...flattenMenus(menu.children, level + 1));
    }
  }

  return result;
}

export default function MenuManager() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [editingName, setEditingName] = useState("");
  const [search, setSearch] = useState("");
  const [expandAll, setExpandAll] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  async function loadMenus() {
    try {
      const data = await api.getMenus();
      setMenus(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load menus.");
    }
  }

  useEffect(() => {
    void loadMenus();
  }, []);

  function handleSelect(menu: Menu) {
    setSelectedMenu(menu);
    setEditingName(menu.name);
  }

  function filterTree(items: Menu[], keyword: string): Menu[] {
    if (!keyword.trim()) {
      return items;
    }

    const lower = keyword.toLowerCase();

    return items.reduce<Menu[]>((acc, item) => {
      const children = filterTree(item.children, keyword);

      if (item.name.toLowerCase().includes(lower) || children.length > 0) {
        acc.push({
          ...item,
          children,
        });
      }

      return acc;
    }, []);
  }

  const filteredMenus = useMemo(
    () => filterTree(menus, search),
    [menus, search],
  );

  const parentName = useMemo(() => {
    if (!selectedMenu?.parentId) {
      return "-";
    }

    const findParent = (items: Menu[]): Menu | undefined => {
      for (const item of items) {
        if (item.id === selectedMenu.parentId) {
          return item;
        }

        const found = findParent(item.children);

        if (found) {
          return found;
        }
      }

      return undefined;
    };

    return findParent(menus)?.name ?? "-";
  }, [menus, selectedMenu]);

  async function handleSave() {
    if (!selectedMenu) return;

    try {
      await api.updateMenu(selectedMenu.id, {
        name: editingName,
        parentId: selectedMenu.parentId,
      });

      await loadMenus();

      setSelectedMenu({
        ...selectedMenu,
        name: editingName,
      });

      toast.success("Menu updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update menu.");
    }
  }

  async function handleDelete() {
    if (!selectedMenu) return;

    if (!window.confirm("Delete this menu?")) {
      return;
    }

    try {
      await api.deleteMenu(selectedMenu.id);

      setSelectedMenu(null);
      setEditingName("");

      await loadMenus();

      toast.success("Menu deleted successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete menu.");
    }
  }

  async function handleCreateChild() {
    if (!selectedMenu) return;

    try {
      await api.createMenu({
        name: "New Menu",
        parentId: selectedMenu.id,
      });

      await loadMenus();

      toast.success("Child menu created successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to create child menu.");
    }
  }

  return (
    <div className="space-y-6">
      <MenuDropdown
        value="System Management"
        options={["System Management"]}
        onChange={() => {}}
      />

      <MenuToolbar
        search={search}
        onSearchChange={setSearch}
        onExpandAll={() => setExpandAll(true)}
        onCollapseAll={() => setExpandAll(false)}
        onAdd={() => {
          setModalMode("create");
          setModalOpen(true);
        }}
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_420px]">
        <MenuTree
          menus={filteredMenus}
          selectedId={selectedMenu?.id ?? null}
          onSelect={handleSelect}
          expandAll={expandAll}
        />

        <DetailPanel
          menu={selectedMenu}
          name={editingName}
          parentName={parentName}
          onNameChange={setEditingName}
          onSave={handleSave}
          onDelete={handleDelete}
          onCreateChild={handleCreateChild}
        />

        <MenuModal
          open={modalOpen}
          mode={modalMode}
          menu={selectedMenu ?? undefined}
          menus={menus}
          onClose={() => setModalOpen(false)}
          onSuccess={loadMenus}
        />
      </div>
    </div>
  );
}
