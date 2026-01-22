import { createPortal } from "react-dom"

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return null
  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      {/* DIALOG */}
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-brand-dark-blue text-xl font-semibold">
          Nova Tarefa
        </h2>
        <p className="text-brand-text-gray mb-4 mt-1 text-sm">
          Insira as informações abaixo
        </p>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskDialog
