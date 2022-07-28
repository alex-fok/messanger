const mapKeyAndFn = (key: string, fn: () => void) => {
  const handler:EventListener = (event: Event) : void => {
    if ((event as KeyboardEvent).code === key) {
      event.preventDefault()
      fn()
    }
  }
  document.addEventListener<'keydown'>('keydown', handler)
  return () => document.removeEventListener('keydown', handler) 
}
export default mapKeyAndFn
