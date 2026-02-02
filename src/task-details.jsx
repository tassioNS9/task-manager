import { CircleArrowLeft, Loader2Icon, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import Button from "./components/Button"
import Input from "./components/Input"
import Sidebar from "./components/Sidebar"
import TimeSelect from "./components/TimeSelect"
const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState({})
  const [time, setTime] = useState("")
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      setTask(data)
      reset(data)
      setTime(data.time)
    }
    getTask()
  }, [taskId, reset])

  const handleEditClick = async (data) => {
    // Lógica para salvar as alterações da tarefa
    const title = data.title.trim() // Para nao ter espaços vazios ao salvar
    const description = data.description.trim() // Para nao ter espaços vazios ao salvar

    const task = {
      title,
      description,
      time,
    }
    console.log(task, "task")
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      // Tratar erro
      return toast.error("Erro ao atualizar a tarefa.")
    }
    const updatedTask = await response.json()
    setTask(updatedTask)
    // Talvez mostrar uma notificação de sucesso
    toast.success("Tarefa atualizada com sucesso!")
  }

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      return toast.error("Erro ao Deletar a tarefa!.")
    }

    toast.success("Tarefa Deletada com Sucesso!")
    navigate("/")
    // Redirecionar para a página principal ou outra página
  }

  return (
    <div className="flex">
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
            <Button
              disabled={isSubmitting}
              onClick={handleDeleteClick}
              color="danger"
            >
              Deletar Tarefa <Trash2 />
            </Button>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleEditClick)} action="POST">
          <div className="flex flex-col rounded-xl bg-white p-6">
            <div className="space-y-3">
              <Input
                id="title"
                label="Título"
                defaultValue={task?.title}
                {...register("title", {
                  required: "Título é obrigatório",
                  min: {
                    value: 3,
                    message: "Título deve ter no mínimo 3 caracteres",
                  },
                  validate: (value) => {
                    if (value.trim().length === 0) {
                      return "Título não pode ser vazio"
                    }
                    return true
                  },
                })}
                errorMessage={errors.title?.message}
              />
            </div>
            <div className="my-6 space-y-3">
              <TimeSelect
                id="time"
                label="Horário"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <Input
                id="description"
                label="Descrição"
                defaultValue={task?.description}
                {...register("description", {
                  required: "Descrição é obrigatório",
                  min: {
                    value: 3,
                    message: "Descrição deve ter no mínimo 3 caracteres",
                  },
                  validate: (value) => {
                    if (value.trim().length === 0) {
                      return "Descrição não pode ser vazia"
                    }
                    return true
                  },
                })}
                errorMessage={errors.description?.message}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 py-3">
            <Button
              disabled={isSubmitting}
              type="submit"
              size="large"
              color="primary"
            >
              {isSubmitting ? (
                <Loader2Icon className="animate-spin text-brand-text-gray" />
              ) : (
                "Salvar"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
