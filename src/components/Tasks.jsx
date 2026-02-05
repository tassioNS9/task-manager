import { useQuery, useQueryClient } from "@tanstack/react-query"
import { CloudSun, Moon, Sun } from "lucide-react"

import { taskQueryKeys } from "../keys/queries"
import Header from "./Header"
import TaskItem from "./TaskItem"
import TaskSepator from "./TaskSepator"
const Tasks = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      })
      const tasks = await response.json()
      return tasks
    },
  })
  const tasksMorning = tasks?.filter((task) => task.time === "morning")
  const taskAfternoon = tasks?.filter((task) => task.time === "afternoon")
  const tasksEvening = tasks?.filter((task) => task.time === "evening")

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }
      if (task.status === "not_started") {
        return { ...task, status: "in_progress" }
      }

      if (task.status === "in_progress") {
        return { ...task, status: "done" }
      }

      if (task.status === "done") {
        return { ...task, status: "not_started" }
      }

      return task
    })
    queryClient.setQueryData(taskQueryKeys.getAll(), newTasks)
  }

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
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
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
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
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
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
