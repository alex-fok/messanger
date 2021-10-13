const isAtLeast3 = (value: string): boolean => value.length > 2
const isAtLeast3orEmpty = (value: string): boolean => value.length > 2 || value.length === 0
const isAtLeast8 = (value: string): boolean => value.length > 7

export type Rule = 'atLeast3' | 'atLeast8' | 'atLeast3OrEmpty'

const validation : Record<Rule, {
  validateFn: (value: string) => boolean,
  errorMsg: string
}> = {
  'atLeast3' : {
    validateFn: isAtLeast3,
    errorMsg: 'must have at least 3 characters'
  },
  'atLeast3OrEmpty': {
    validateFn: isAtLeast3orEmpty,
    errorMsg: 'must have at least 3 characters or empty'
  },
  'atLeast8' : {
    validateFn: isAtLeast8,
    errorMsg: 'must have at least 8 characters'
  }
}

const validateInput = (input: {name: string, value: string}, rules: Rule[]):[boolean, string] => {
  for(const rule of rules) {
    const {validateFn, errorMsg} = validation[rule]
    if (!validateFn(input.value)) return [false, input.name + ' ' + errorMsg]
  }
  return [true, '']
}

export default validateInput
