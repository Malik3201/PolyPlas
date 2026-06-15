import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <AdminSidebar />
      <div className="lg:pl-56">
        <div className="pt-14 lg:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
