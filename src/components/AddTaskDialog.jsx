import "./AddTaskDialog.css"

import { Loader2Icon } from "lucide-react"
import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"

import { useAddTasks } from "../hooks/data/use-add-tasks"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"
const AddTaskDialog = ({ isOpen, handleClose }) => {
  const { mutate } = useAddTasks()
  const nodeRef = useRef()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  })

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      description: data.description.trim(),
      time: data.time,
      status: "not_started",
    }

    mutate(task, {
      onSuccess: () => {
        toast.success("Tarefa adicionada com SUcesso!")
        handleClose()
        reset({
          title: "",
          description: "",
          time: "evening",
        })
      },
      onError: () => {
        toast.error("Erro ao adicionar tarefaaa.")
      },
    })
  }

  const handleCloseClick = () => {
    if (isSubmitting) return
    reset({
      title: "",
      description: "",
      time: "evening",
    })
    handleClose()
  }

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
            <div>
              <div className="rounded-xl bg-white p-5 text-center shadow">
                <h2 className="brand-dark-blue text-xl font-semibold">
                  Nova Tarefa
                </h2>
                <p className="mb-1 mt-1 text-sm text-brand-text-gray">
                  Insira as informações abaixo
                </p>

                <form
                  onSubmit={handleSubmit(handleSaveClick)}
                  className="flex w-[336px] flex-col space-y-4"
                >
                  <Input
                    id="title"
                    label="Título"
                    placeholder="Insira o título da tarefa"
                    errorMessage={errors?.title?.message}
                    disabled={isSubmitting}
                    {...register("title", {
                      required: "Título é obrigatório",
                      minLength: {
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
                  />
                  <TimeSelect
                    id="time"
                    label="Horário"
                    disabled={isSubmitting}
                    {...register("time", {
                      required: "Horário é obrigatório",
                      minLength: {
                        value: 3,
                        message: "Horário deve ter no mínimo 3 caracteres",
                      },
                    })}
                  />

                  <Input
                    id="description"
                    label="Descrição"
                    placeholder="Descreva a Tarefa"
                    errorMessage={errors?.description?.message}
                    disabled={isSubmitting}
                    {...register("description", {
                      required: "Descrição é obrigatório",
                      minLength: {
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
                  />

                  <div className="flex justify-center gap-4">
                    <Button
                      color="secondary"
                      className="w-full justify-center"
                      size="large"
                      type="button"
                      onClick={handleCloseClick}
                    >
                      Cancelar
                    </Button>
                    {isSubmitting ? (
                      <Loader2Icon className="animate-spin text-brand-text-gray" />
                    ) : (
                      <Button
                        className="w-full justify-center"
                        type="submit"
                        size="large"
                        disabled={isSubmitting}
                      >
                        Adicionar
                      </Button>
                    )}
                  </div>
                </form>
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
}

export default AddTaskDialog
