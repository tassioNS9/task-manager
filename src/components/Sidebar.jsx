import { House } from "lucide-react"
import { ListChecks } from "lucide-react"

import SidebarItem from "./SidebarItem"
const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-brand-primary text-xl font-semibold">
          Task Manager
        </h1>
        <p>
          Um simples{" "}
          <span className="text-brand-primary">organizador de tarefas</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 px-2">
        <SidebarItem color="selected" href="#">
          <House />
          Inicio
        </SidebarItem>
        <SidebarItem color="unselected" href="#">
          <ListChecks />
          Minhas tarefas
        </SidebarItem>
      </div>
    </div>
  )
}

export default Sidebar
