import { LayoutGrid } from "lucide-react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: Readonly<HeaderProps>) {
  return (
    <header className="flex items-center gap-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0054B8] shadow-sm">
        <LayoutGrid size={28} strokeWidth={2.2} className="text-white" />
      </div>

      <h1 className="text-5xl font-bold tracking-tight text-[#101828]">
        {title}
      </h1>
    </header>
  );
}
