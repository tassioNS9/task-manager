const Button = ({ children, variant = "primary", ...rest }) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5]  text-white"
    }
    if (variant === "ghost") {
      return "bg-transparent text-[#818181]"
    }
  }
  return (
    <button
      {...rest}
      className={`flex items-center gap-2 rounded-md px-3 py-1 font-semibold transition hover:opacity-50 ${getVariantClasses()} text-xs`}
    >
      {children}
    </button>
  )
}

export default Button
