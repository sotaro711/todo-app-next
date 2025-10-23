import TodoApp from "./components/TodoApp";
import { AppSidebar } from "./components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-6">
        <SidebarTrigger />
        <TodoApp />
      </main>
    </SidebarProvider>
  );
}
