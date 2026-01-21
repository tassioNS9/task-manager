import { PlusIcon } from "lucide-react"
import { Trash2 } from "lucide-react"
import { CloudSun, Moon, Sun } from "lucide-react"
import { useState } from "react"

import Button from "./Button"
import { TASKS } from "./constants/tasks"
import TaskItem from "./TaskItem"
import TaskSepator from "./TaskSepator"
const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)

  const tasksMorning = tasks.filter((task) => task.time === "morning")
  const taskAfternoon = tasks.filter((task) => task.time === "afternoon")
  const tasksEvening = tasks.filter((task) => task.time === "evening")
  return (
    <div className="w-full px-8 py-16">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 p-3 px-2">
          <span className="text-xs text-[#00ADB5]">Minhas Tarefas</span>
          <h2 className="tex-[#35383E] text-xl font-bold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            Limpar tarefas <Trash2 />
          </Button>
          <Button>
            Nova Tarefa <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-col rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TaskSepator icon={<Sun />} text="Manhã" />
          {tasksMorning.map((task) => (
            <TaskItem id={task.id} task={task} />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TaskSepator icon={<CloudSun />} text="Tarde" />
        </div>
        <div className="space-y-3">
          <TaskSepator icon={<Moon />} text="Noite" />
        </div>
      </div>
    </div>
  )
}

export default Tasks
