const isAtLeast3 = (value: string): boolean => value.length > 2
const isAtLeast8 = (value: string): boolean => value.length > 7

export type Rule = 'atLeast3' | 'atLeast8'

const validation : Record<Rule, (value: string) => boolean> = {
  'atLeast3' : isAtLeast3,
  'atLeast8' : isAtLeast8
}

const validateInput = (input: string, rules: Rule[]) => 
  rules.reduce((prev, rule) => prev && validation[rule](input), true)

export default validateInput
