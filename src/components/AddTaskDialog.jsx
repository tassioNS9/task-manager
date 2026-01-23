import "./AddTaskDialog.css"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"
const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [time, setTime] = useState("evening")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState([])
  const nodeRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      setTime("")
      setDescription("")
      setTime("morning")
    }
  }, [isOpen])

  const handleSaveClick = () => {
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

    if (newErrors.length > 0) return

    handleSubmit({
      id: v4(),
      title,
      description,
      time,
      status: "not_started",
    })
    handleClose()
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            {/* DIALOG */}
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-brand-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="mb-1 mt-1 text-sm text-[#9A9C9F]">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  errorMessage={titleError?.message}
                />
                <TimeSelect
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  errorMessage={timeError?.message}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a Tarefa"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  errorMessage={descriptionError?.message}
                />

                <div className="flex justify-center gap-4">
                  <Button
                    className="w-full justify-center"
                    size="large"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="w-full justify-center"
                    size="large"
                    onClick={handleSaveClick}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
