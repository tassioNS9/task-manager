import { useQuery, useQueryClient } from "@tanstack/react-query"
import { PlusIcon } from "lucide-react"
import { Trash2 } from "lucide-react"
import { CloudSun, Moon, Sun } from "lucide-react"
import { useState } from "react"

import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
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
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
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
    queryClient.setQueryData(["tasks"], newTasks)
  }

  return (
    <div className="w-full space-y-2 px-8 py-16">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 p-3 px-2">
          <span className="text-xs text-brand-primary">Minhas Tarefas</span>
          <h2 className="tex-brand-dark-blue text-xl font-bold">
            Minhas Tarefas
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Button color="ghost">
            Limpar tarefas <Trash2 />
          </Button>
          <Button color="primary" onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova Tarefa <PlusIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
          />
        </div>
      </div>
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
