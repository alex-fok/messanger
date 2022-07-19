import { FC } from 'react'
export type DialogFC = FC<{
  show: boolean,
  onClose: () => void
}>
