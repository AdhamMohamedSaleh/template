import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { Session } from "@/lib/auth/types";

export default function DashboardShell({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ocean-950">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-ocean-950 md:block">
        <div className="px-4 py-6 text-lg font-semibold text-white">
          Aquared
        </div>
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col">
        <DashboardHeader session={session} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
