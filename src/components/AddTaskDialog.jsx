import { createPortal } from "react-dom"

import Button from "./Button"
import Input from "./Input"
const AddTaskDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null
  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
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
          />
          <Input id="time" label="Horário" placeholder="Insira seu Horário" />
          <Input
            id="description"
            label="Descrição"
            placeholder="Descreva a Tarefa"
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
            <Button className="w-full justify-center" size="large">
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskDialog
