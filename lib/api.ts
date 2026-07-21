import type { Menu } from "@/types/menu";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

interface CreateMenuDto {
  name: string;
  parentId?: string | null;
}

interface UpdateMenuDto {
  name?: string;
  parentId?: string | null;
}

class Api {
  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  getMenus() {
    return this.request<Menu[]>("/menus");
  }

  createMenu(data: CreateMenuDto) {
    return this.request<Menu>("/menus", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  updateMenu(id: string, data: UpdateMenuDto) {
    return this.request<Menu>(`/menus/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  deleteMenu(id: string) {
    return this.request<void>(`/menus/${id}`, {
      method: "DELETE",
    });
  }
}

export const api = new Api();
