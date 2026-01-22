import {
  CheckIcon,
  Loader2Icon,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react"

import Button from "./Button"

const TaskItem = ({ task, handleTaskCheckboxClick, handleDeleteTask }) => {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-[#00ADB5]   text-[#00ADB5]"
    }
    if (task.status === "in_progress") {
      return "bg-[#FFAA04]  text-[#FFAA04]"
    }
    if (task.status === "not_started") {
      return "bg-[#35383E] bg-opacity-10  text-[#35383E]"
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
            onChange={() => handleTaskCheckboxClick(task.id)}
          />
          {task.status === "done" && <CheckIcon className="text-white" />}
          {task.status === "in_progress" && (
            <Loader2Icon className="animate-spin text-white" />
          )}
        </label>
        <p className="">{task.title}</p>
      </div>
      <div className="flex items-center">
        <Button onClick={() => handleDeleteTask(task.id)} variant="ghost">
          <Trash2 />
        </Button>

        <a href="#" className="text-[#9599a1] transition hover:opacity-75">
          {" "}
          <SquareArrowOutUpRight />
        </a>
      </div>
    </div>
  )
}

export default TaskItem
