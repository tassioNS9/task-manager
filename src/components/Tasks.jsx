import { PlusIcon } from "lucide-react"
import { Trash2 } from "lucide-react"
import { CloudSun, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TaskSepator from "./TaskSepator"
const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const tasksMorning = tasks.filter((task) => task.time === "morning")
  const taskAfternoon = tasks.filter((task) => task.time === "afternoon")
  const tasksEvening = tasks.filter((task) => task.time === "evening")

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      })
      const data = await response.json()
      console.log({ data })
      setTasks(data)
    }
    getTasks()
  }, [])

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

    setTasks(newTasks)
  }

  const handleAddTask = async (newTask) => {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })

    if (!response.ok) {
      return toast.error("Erro ao adicionar tarefa.")
    }
    setTasks([...tasks, newTask])
    toast.success("Tarefa Criada com Sucesso!")
  }

  const handleDeleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)

    setTasks(newTasks)
    toast.success("Tarefa Deletada com Sucesso!")
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
            handleSubmit={handleAddTask}
          />
        </div>
      </div>
      <div className="flex flex-col rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TaskSepator icon={<Sun />} title="Manhã" />
          {tasksMorning.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TaskSepator icon={<CloudSun />} title="Tarde" />
          {taskAfternoon.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSepator icon={<Moon />} title="Noite" />
          {tasksEvening.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
