import PropTypes from "prop-types"

const TaskSepator = ({ icon, title }) => {
  return (
    <div className="border-brand-border flex items-center gap-2 border-b border-solid pb-4 text-[#949C9F]">
      {icon}
      <p className="text-sm">{title}</p>
    </div>
  )
}

TaskSepator.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
}

export default TaskSepator
