import { emailRegex } from './emailRegex'

const isAtLeast3 = (value: string): boolean => value.length > 2
const isAtLeast3orEmpty = (value: string): boolean => value.length > 2 || value.length === 0
const isAtLeast8 = (value: string): boolean => value.length > 7
const isEmail = (value: string): boolean => value.match(emailRegex) ? true : false

export type Rule = 'atLeast3' | 'atLeast8' | 'atLeast3OrEmpty' | 'email'

const validation : Record<Rule, {
  validateFn: (value: string) => boolean,
  errorMsg: {
    text: string,
    prefix: boolean
  }
}> = {
  'atLeast3' : {
    validateFn: isAtLeast3,
    errorMsg: {
      text: 'must have at least 3 characters',
      prefix: true
    }
  },
  'atLeast3OrEmpty': {
    validateFn: isAtLeast3orEmpty,
    errorMsg: {
      text: 'must have at least 3 characters or empty',
      prefix: true
    }
  },
  'atLeast8' : {
    validateFn: isAtLeast8,
    errorMsg: {
      text: 'must have at least 8 characters',
      prefix: true
    }
  },
  'email' : {
    validateFn: isEmail,
    errorMsg: {
      text: 'Email is not valid',
      prefix: false
    }
  }
}

const validateInput = (input: {name: string, value: string}, rules: Rule[]):[boolean, string] => {
  for(const rule of rules) {
    const {validateFn, errorMsg} = validation[rule]
    if (!validateFn(input.value)) {
      const prefix = errorMsg.prefix ? input.name + ' ' : ''
      return [false, prefix + errorMsg.text]
    }
  }
  return [true, '']
}

export default validateInput
