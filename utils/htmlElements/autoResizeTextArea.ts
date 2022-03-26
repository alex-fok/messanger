const autoResizeTextArea = (textArea: HTMLTextAreaElement) => {
  const style = window.getComputedStyle(textArea)
  const lineHeight: number = parseFloat(style.lineHeight)
  const offset: number = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
  
  textArea.style.height = lineHeight + offset + 'px'
  
  const heightLimit: number = lineHeight * 3 + offset
  const scrollHeight: number = textArea.scrollHeight + offset

  if (scrollHeight > heightLimit)
    textArea.style.height = heightLimit + 'px'
  else if (scrollHeight + 'px' !== textArea.style.height)
    textArea.style.height = scrollHeight + 'px'
}
export default autoResizeTextArea
