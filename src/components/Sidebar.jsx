import SidebarItem from "./SidebarItem"

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-[#00ADB5]">Task Manager</h1>
        <p>
          Um simples{" "}
          <span className="text-[#00ADB5]">organizador de tarefas</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 px-2">
        <SidebarItem variant="selected" href="#">
          Inicio
        </SidebarItem>
        <SidebarItem variant="unselected" href="#">
          Minhas tarefas
        </SidebarItem>
      </div>
    </div>
  )
}

export default Sidebar
