const mapKeyAndFn = (key: string, fn: () => void) => {
  const handler:EventListener = (event: Event) : void => {
    const e = event as KeyboardEvent
    if (e.code === key) fn()
  }
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler) 
}
export default mapKeyAndFn
