import { CircleArrowLeft, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Toaster } from "sonner"

import Button from "./components/Button"
import Input from "./components/Input"
import Sidebar from "./components/Sidebar"
import TimeSelect from "./components/TimeSelect"
const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState({})

  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      console.log(data, "dadad")
      setTask(data)
    }
    getTask()
  }, [taskId])

  return (
    <div className="flex">
      <Toaster
        toastOptions={{
          style: {
            color: "blue",
          },
        }}
      />
      <Sidebar />
      <div className="w-full space-y-2 px-8 py-16">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 p-3 px-2">
            <Link to="/">
              <CircleArrowLeft className="text-brand-primary" size="30" />
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-xs text-brand-text-gray">
                Minhas Tarefas
              </span>
              <span className="text-xs text-brand-primary">{task?.title}</span>
            </div>

            <h2 className="tex-brand-dark-blue text-xl font-bold">
              {task?.title}
            </h2>
          </div>
          <div className="flex items-center gap-4 self-end py-3">
            <Button color="danger">
              Deletar Tarefa <Trash2 />
            </Button>
          </div>
        </div>
        <div className="flex flex-col rounded-xl bg-white p-6">
          <div className="space-y-3">
            <Input id="title" label="Título" value={task?.title} />
          </div>
          <div className="my-6 space-y-3">
            <TimeSelect value={task?.time} />
          </div>
          <div className="space-y-3">
            <Input
              id="description"
              label="Descrição"
              value={task?.description}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 py-3">
          <Button size="large" color="secondary">
            Cancelar
          </Button>
          <Button size="large" color="primary">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
