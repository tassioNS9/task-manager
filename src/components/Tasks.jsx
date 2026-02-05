import { CloudSun, Moon, Sun } from "lucide-react"

import { useGetTasks } from "../hooks/data/use-get-tasks"
import Header from "./Header"
import TaskItem from "./TaskItem"
import TaskSepator from "./TaskSepator"
const Tasks = () => {
  const { data: tasks } = useGetTasks()
  const tasksMorning = tasks?.filter((task) => task.time === "morning")
  const taskAfternoon = tasks?.filter((task) => task.time === "afternoon")
  const tasksEvening = tasks?.filter((task) => task.time === "evening")

  return (
    <div className="w-full space-y-2 px-8 py-16">
      <Header title="Minhas tarefas" subtitle="Minhas Tarefas" />
      <div className="flex flex-col rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TaskSepator icon={<Sun />} title="Manhã" />
          {tasksMorning?.length === 0 && (
            <p className="px-4 text-left text-sm text-brand-text-gray">
              Nenhuma tarefa para este período
            </p>
          )}
          {tasksMorning?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TaskSepator icon={<CloudSun />} title="Tarde" />
          {taskAfternoon?.length === 0 && (
            <p className="px-4 text-left text-sm text-brand-text-gray">
              Nenhuma tarefa para este período
            </p>
          )}
          {taskAfternoon?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSepator icon={<Moon />} title="Noite" />
          {tasksEvening?.length === 0 && (
            <p className="px-4 text-left text-sm text-brand-text-gray">
              Nenhuma tarefa para este período
            </p>
          )}
          {tasksEvening?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
