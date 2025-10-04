import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 flex flex-col lg:ml-0">
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
