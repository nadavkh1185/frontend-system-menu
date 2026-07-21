"use client";

import { useEffect, useState } from "react";

import type { Menu } from "@/types/menu";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface MenuModalProps {
  open: boolean;
  mode: "create" | "edit";
  menu?: Menu;
  menus: Menu[];
  onClose: () => void;
  onSuccess: () => void;
}

interface FlatMenu {
  id: string;
  name: string;
}

function flattenMenus(menus: Menu[], level: number = 0): FlatMenu[] {
  const result: FlatMenu[] = [];

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

export default function MenuModal({
  open,
  mode,
  menu,
  menus,
  onClose,
  onSuccess,
}: Readonly<MenuModalProps>) {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<string>("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const allMenus = flattenMenus(menus);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && menu) {
      setName(menu.name);
      setParentId(menu.parentId ?? "");
    } else {
      setName("");
      setParentId("");
    }

    setError("");
  }, [open, mode, menu]);

  async function handleSubmit() {
    if (!name.trim()) {
      setError("Menu name is required.");
      return;
    }

    try {
      setSaving(true);

      if (mode === "create") {
        await api.createMenu({
          name,
          parentId: parentId || undefined,
        });
        toast.success(`"${name}" created successfully.`);
      } else if (menu) {
        await api.updateMenu(menu.id, {
          name,
          parentId: parentId || undefined,
        });
        toast.success(`"${name}" updated successfully.`);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(error);

      toast.error(
        mode === "create" ? "Failed to create menu." : "Failed to update menu.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-[#101828]">
          {mode === "create" ? "Add Menu" : "Edit Menu"}
        </h2>

        <p className="mt-1 text-sm text-[#667085]">
          {mode === "create"
            ? "Create a new menu."
            : "Update menu information."}
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#344054]">
              Menu Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black w-full rounded-xl border border-[#D0D5DD] px-4 py-3 outline-none transition focus:border-[#0051AF]"
              placeholder="Input menu name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#344054]">
              Parent Menu
            </label>

            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="text-black w-full rounded-xl border border-[#D0D5DD] px-4 py-3 outline-none transition focus:border-[#0051AF]"
            >
              <option value="">Root</option>

              {allMenus.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="text-black rounded-xl border border-[#888c93] px-5 py-2.5 font-medium transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="rounded-xl bg-[#0051AF] px-5 py-2.5 font-semibold text-white transition hover:bg-[#00479A]"
          >
            {saving ? "Saving..." : mode === "create" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
