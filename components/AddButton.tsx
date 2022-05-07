import { FC, MouseEventHandler } from "react"

type AddButtonFC = FC<{
  onClick: MouseEventHandler<HTMLButtonElement> | (() => void)
}>

const AddButton:AddButtonFC = ({onClick}) => {
  return (
    <button
      className='flex items-center justify-center w-6 h-6 rounded-full text-gray-400 hover:bg-gray-400 hover:text-white'
      onClick={onClick}
    ><span
      className='font-black text-md'
    >+</span>
    </button>
  )
}

export default AddButton
