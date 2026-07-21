"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Folder,
  LayoutGrid,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const systems = [
  {
    title: "System Code",
    icon: LayoutGrid,
  },
  {
    title: "Properties",
    icon: LayoutGrid,
  },
  {
    title: "Menus",
    icon: LayoutGrid,
    active: true,
  },
  {
    title: "API List",
    icon: LayoutGrid,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <aside
      className={`flex h-full flex-col rounded-[30px] bg-[#0051AF] text-white transition-all duration-300 ${
        collapsed ? "w-[100px]" : "w-[264px]"
      }`}
    >
      {/* Header */}
      <div
        className={`relative flex items-center pt-7 transition-all duration-300 ${
          collapsed ? "justify-center px-3" : "justify-between px-6"
        }`}
      >
        <Image
          src={
            collapsed
              ? "https://cdn.sanity.io/images/jjgt634a/production/e32d8d194f60ec3c3fd0b7973140555997271d41-37x37.svg"
              : "https://cdn.sanity.io/images/jjgt634a/production/816b2f202b293ceaad6c9c6f651062c814d22697-72x30.svg"
          }
          alt="STK"
          width={collapsed ? 37 : 82}
          height={collapsed ? 37 : 30}
          priority
          className="transition-all duration-300"
        />

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden items-center justify-center transition lg:flex ${
            collapsed
              ? "absolute -right-5 top-7 h-10 w-10 rounded-full bg-[#0051AF] text-white shadow-lg hover:bg-[#00479A]"
              : "rounded-xl p-2 hover:bg-white/10"
          }`}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      {/* Systems */}
      <div className="mt-8 px-4">
        <div
          className={`rounded-[24px] bg-[#045FC7] transition-all duration-300 ${
            collapsed ? "p-2" : "p-4"
          }`}
        >
          <div
            className={`mb-4 flex items-center rounded-xl font-semibold transition-all ${
              collapsed ? "justify-center py-3" : "gap-3 px-4 py-3"
            }`}
          >
            <Folder size={20} />
            {!collapsed && <span>Systems</span>}
          </div>

          {systems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                className={`mb-2 flex w-full items-center rounded-2xl py-3 text-left transition-all duration-200 ${
                  collapsed ? "justify-center px-0" : "gap-3 px-4"
                } ${
                  item.active
                    ? "bg-white text-[#101828] shadow-sm"
                    : "hover:bg-white/15"
                }`}
              >
                <Icon size={18} />

                {!collapsed && (
                  <span className="text-sm font-medium">{item.title}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="mt-8 space-y-2 px-4">
        <button
          className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/10 transition-all duration-200 ${
            collapsed ? "justify-center" : "gap-3"
          }`}
          type="button"
        >
          <Folder size={20} />
          {!collapsed && <span className="font-medium">Users & Group</span>}
        </button>

        <button
          className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white/10 transition-all duration-200 ${
            collapsed ? "justify-center" : "gap-3"
          }`}
          type="button"
        >
          <Folder size={20} />
          {!collapsed && <span className="font-medium">Competition</span>}
        </button>
      </div>

      <div className="flex-1" />
    </aside>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-5 top-5 z-40 rounded-xl bg-[#045FC7] p-2 shadow lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Desktop */}
      <div className="hidden h-screen bg-[#F8FAFC] p-6 lg:block">{content}</div>

      {/* Mobile */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          <div className="fixed left-0 top-0 z-50 h-screen bg-[#F8FAFC] p-6">
            {content}
          </div>
        </>
      )}
    </>
  );
}
