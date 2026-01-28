import { CircleArrowLeft, Loader2Icon, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast, Toaster } from "sonner"

import Button from "./components/Button"
import Input from "./components/Input"
import Sidebar from "./components/Sidebar"
import TimeSelect from "./components/TimeSelect"
const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState({})
  const [time, setTime] = useState("")
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const titleRef = useRef()
  const descriptionRef = useRef()

  useEffect(() => {
    const getTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      setTask(data)
    }
    getTask()
  }, [taskId])

  const handleEditClick = async () => {
    setIsLoading(true)
    // Lógica para salvar as alterações da tarefa
    const title = titleRef?.current.value
    const description = descriptionRef?.current.value

    // Nova Verificação utilizando o Ref
    const newErrors = []
    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O campo Titulo é Obrigátorio!",
      })
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O campo de Horario é Obrigátorio!",
      })
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "O campo Descrição é Obrigátorio!",
      })
    }
    setErrors(newErrors)

    if (newErrors.length > 0) return setIsLoading(false)

    const task = {
      title,
      description,
      time,
    }
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
    setIsLoading(false)
    const updatedTask = await response.json()
    setTask(updatedTask)
    // Talvez mostrar uma notificação de sucesso
    toast.success("Tarefa atualizada com sucesso!")
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

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
            <Button disabled={isLoading} color="danger">
              Deletar Tarefa <Trash2 />
            </Button>
          </div>
        </div>
        <div className="flex flex-col rounded-xl bg-white p-6">
          <div className="space-y-3">
            <Input
              id="title"
              label="Título"
              ref={titleRef}
              defaultValue={task?.title}
              errorMessage={titleError?.message}
            />
          </div>
          <div className="my-6 space-y-3">
            <TimeSelect
              defaultValue={task?.time}
              onChange={(e) => setTime(e.target.value)}
              errorMessage={timeError?.message}
            />
          </div>
          <div className="space-y-3">
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              ref={descriptionRef}
              errorMessage={descriptionError?.message}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 py-3">
          <Button
            disabled={isLoading}
            onClick={handleEditClick}
            size="large"
            color="primary"
          >
            {isLoading ? (
              <Loader2Icon className="animate-spin text-brand-text-gray" />
            ) : (
              "Salvar"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
