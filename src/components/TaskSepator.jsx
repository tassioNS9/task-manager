const TaskSepator = ({ icon, text }) => {
  return (
    <div className="border-brand-border flex items-center gap-2 border-b border-solid pb-4 text-[#949C9F]">
      {icon}
      <p className="text-sm">{text}</p>
    </div>
  )
}

export default TaskSepator
