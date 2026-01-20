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
      <div className="flex flex-col px-2">
        <a className="rounded bg-[#E6F7F8] px-4 py-2 text-[#00ADB5]" href="#">
          Inicio
        </a>
        <a className="px-4 py-4" href="#">
          Minhas Tarefas
        </a>
      </div>
    </div>
  )
}

export default Sidebar
