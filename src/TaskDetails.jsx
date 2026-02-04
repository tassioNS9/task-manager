import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CircleArrowLeft, Loader2Icon, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import Button from "./components/Button"
import Input from "./components/Input"
import Sidebar from "./components/Sidebar"
import TimeSelect from "./components/TimeSelect"
import { useGetTasks } from "./hooks/data/use-get-tasks"
const TaskDetailsPage = () => {
  const queryClient = useQueryClient()
  const { taskId } = useParams()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm()

  const { data: task } = useGetTasks()

  const { mutate: updateTask, isPending } = useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (newTask) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })

      if (!response.ok) {
        // Tratar erro
        throw new Error()
      }
      const updateTask = await response.json()

      return updateTask
    },
  })

  const { mutate: deleteTask } = useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error()
      }

      queryClient.setQueryData(["tasks"], (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== taskId)
      })
      return response.json()
    },
  })

  const handleEditClick = async (data) => {
    // Lógica para salvar as alterações da tarefa
    const title = data.title.trim() // Para nao ter espaços vazios ao salvar
    const description = data.description.trim() // Para nao ter espaços vazios ao salvar
    const time = data.time
    const task = {
      title,
      description,
      time,
    }

    updateTask(task, {
      onSuccess: () => {
        queryClient.refetchQueries(["tasks"]) // faz um refetch na lista de tarefas para atualizar os dados
        toast.success("Tarefa Atualizada com SUcesso!")
      },
      onError: () => {
        toast.error("Erro ao Atualizar a tarefaa.")
      },
    })
  }

  const handleDeleteClick = async () => {
    deleteTask(task, {
      onSuccess: () => {
        toast.success("Tarefa Deletada com Sucesso!")
        navigate("/")
      },
      onError: () => {
        toast.error("Erro ao Deletar a tarefa!.")
      },
    })

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
        <form onSubmit={handleSubmit(handleEditClick)}>
          <div className="flex flex-col rounded-xl bg-white p-6">
            <div className="space-y-3">
              <Input
                id="title"
                label="Título"
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
                errorMessage={errors?.title?.message}
              />
            </div>
            <div className="my-6 space-y-3">
              <TimeSelect
                id="time"
                label="Horário"
                {...register("time", {
                  required: "Horário é obrigatório",
                  min: {
                    value: 3,
                    message: "Horário deve ter no mínimo 3 caracteres",
                  },
                })}
              />
            </div>
            <div className="space-y-3">
              <Input
                id="description"
                label="Descrição"
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
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 py-3">
            <Button
              disabled={isPending}
              type="submit"
              size="large"
              color="primary"
            >
              {isPending ? (
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
