import { LampDeskIcon, LoaderIcon, TabletIcon } from "lucide-react"

import { useGetTasks } from "../hooks/data/use-get-tasks"
import DashboardCard from "./DashboardCard"

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()

  const notStartedTasks = tasks?.filter(
    (task) => task.status === "not_started"
  ).length
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in_progress"
  ).length
  const completedTasks = tasks?.filter((task) => task.status === "done").length

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<TabletIcon />}
        mainText={tasks?.length}
        secondaryText="Tarefas totais"
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={notStartedTasks}
        secondaryText="Tarefas não iniciadas"
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />
      <DashboardCard
        icon={<LampDeskIcon />}
        mainText={completedTasks}
        secondaryText="Tarefas concluídas"
      />
    </div>
  )
}

export default DashboardCards
