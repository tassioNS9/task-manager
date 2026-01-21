const TaskSepator = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-[#F4F4F5] pb-4 text-[#949C9F]">
      {icon}
      <p className="text-sm">{text}</p>
    </div>
  )
}

export default TaskSepator
