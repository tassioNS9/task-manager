import { PlusIcon } from "lucide-react"
import { Trash2 } from "lucide-react"
import { useState } from "react"

import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
const Header = ({ subtitle, title }) => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2 p-3 px-2">
        <span className="text-xs text-brand-primary">{subtitle}</span>
        <h2 className="tex-brand-dark-blue text-xl font-bold">{title}</h2>
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
  )
}

export default Header
