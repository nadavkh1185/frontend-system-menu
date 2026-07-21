import { ReactNode } from "react";

interface MainContentProps {
  header: ReactNode;
  children: ReactNode;
}

export default function MainContent({ header, children }: MainContentProps) {
  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#F8FAFC]">
      {/* Header */}
      <div className="shrink-0">
        <div className="mx-auto w-full max-w-[1600px] px-6 pt-8 pb-2 lg:px-10 lg:pt-10">
          <div className="space-y-6">{header}</div>
        </div>
      </div>

      {/* Area konten */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-10 lg:px-10">
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </main>
  );
}
