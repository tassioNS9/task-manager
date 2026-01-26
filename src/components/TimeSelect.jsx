import InputErrorMessage from "./InputErrorMessage"
import InputLabel from "./InputLabel"
const TimeSelect = (props) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        id="time"
        className="outline-text-brand-primary placeholder:text-brand-primary rounded-lg border border-solid border-[#ECECEC] px-4 py-3 placeholder:text-sm"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {props.errorMessage && (
        <InputErrorMessage>{props.errorMessage}</InputErrorMessage>
      )}
    </div>
  )
}

export default TimeSelect
