let randomVal = Date.now().toString()

const resetVal = () => {
  randomVal = Date.now().toString()
}

const getVal = () => randomVal

export {
  resetVal,
  getVal 
}
