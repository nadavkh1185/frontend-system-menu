import { Folder } from "lucide-react";

interface BreadcrumbProps {
  current: string;
}

export default function Breadcrumb({ current }: Readonly<BreadcrumbProps>) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-3">
      <Folder size={18} className="fill-[#D0D5DD] text-[#D0D5DD]" />

      <span className="text-[#98A2B3]">/</span>

      <span className="text-sm font-medium text-[#101828]">{current}</span>
    </nav>
  );
}
