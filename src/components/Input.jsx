import { forwardRef } from "react"

import InputLabel from "./InputLabel"
const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        ref={ref}
        className="border-brand-border outline-brand-primary rounded-lg border border-solid px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  )
})

// Obrigatório quando utilizamos o forwardRef
Input.displayName = "Input"

export default Input
