import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const CustomSelect = ({
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder,
  className
}) => {
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem
            key={option.value}
            value={option.value}
            className={option.color}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CustomSelect
