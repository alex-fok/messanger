import { FC, MouseEventHandler } from 'react'
export type ButtonFC = FC<{
  className?: string,
  onClick: MouseEventHandler<HTMLButtonElement>
}>
