import {FC, MouseEventHandler} from 'react'

export type AddButtonFC = FC<{
  onClick: MouseEventHandler<HTMLButtonElement> | (() => void)
}>
