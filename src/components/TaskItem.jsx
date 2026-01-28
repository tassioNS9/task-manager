import {
  CheckIcon,
  Loader2Icon,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react"
import PropTypes from "prop-types"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import Button from "./Button"

const TaskItem = ({ task, handleTaskCheckboxClick, onDeleteSucess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true)
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      setDeleteIsLoading(false)
      return toast.error("Erro ao Deletar a tarefa!.")
    }

    toast.success("Tarefa Deletada com Sucesso!")
    onDeleteSucess(task.id)
    setDeleteIsLoading(false)
  }

  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary text-brand-primary"
    }
    if (task.status === "in_progress") {
      return "bg-brand-process  text-brand-process"
    }
    if (task.status === "not_started") {
      return "bg-brand-dark-blue bg-opacity-10  text-brand-dark-blue"
    }
  }
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleTaskCheckboxClick(task?.id)}
          />
          {task.status === "done" && <CheckIcon className="text-white" />}
          {task.status === "in_progress" && (
            <Loader2Icon className="animate-spin text-white" />
          )}
        </label>
        <p className="">{task.title}</p>
      </div>
      <div className="flex items-center">
        <Button
          onClick={handleDeleteClick}
          color="ghost"
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <Loader2Icon className="animate-spin text-brand-text-gray" />
          ) : (
            <Trash2 />
          )}
        </Button>

        <Link
          to={`/tasks/${task.id}`}
          className="text-[#9599A1] transition hover:opacity-75"
        >
          {" "}
          <SquareArrowOutUpRight />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["not_started", "in_progress", "done"]).isRequired,
  }).isRequired,
  handleTaskCheckboxClick: PropTypes.func.isRequired,
  onDeleteSucess: PropTypes.func.isRequired,
}

export default TaskItem
