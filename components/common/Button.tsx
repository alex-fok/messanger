import { ButtonFC } from "../../types/components/comm/button"

const Button:ButtonFC = ({children, className, onClick}) => {
  return (
    <button
      className={`flex items-center justify-center ${className || ''}`}
      onClick={onClick}
    >{children}
    </button>
  )
}

export default Button
