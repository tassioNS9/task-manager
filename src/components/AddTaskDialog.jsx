import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"
const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [time, setTime] = useState("evening")
  const [errors, setErrors] = useState([])
  const nodeRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      setTime("morning")
    }
  }, [isOpen])

  const handleSaveClick = () => {
    const newErrors = []
    const title = titleRef?.current.value
    const description = descriptionRef?.current.value

    // Nova Verificação utilizando o Ref
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
              <h2 className="brand-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="text-brand-text-gray mb-1 mt-1 text-sm">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
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
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                />

                <div className="flex justify-center gap-4">
                  <Button
                    color="secondary"
                    className="w-full justify-center"
                    size="large"
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

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default AddTaskDialog
