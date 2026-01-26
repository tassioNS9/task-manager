const InputLabel = (props) => {
  return (
    <label className="brand-dark-blue text-sm font-semibold" {...props}>
      {props.children}
    </label>
  )
}

export default InputLabel
