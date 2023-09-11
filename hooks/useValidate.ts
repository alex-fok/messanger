import { Dispatch, SetStateAction, useState } from 'react'
import validate, { Rule } from 'utils/validateInput'

const useValidate = (name: string, init: string, options: Rule[] ):
[string, Dispatch<SetStateAction<string>>, boolean, string] => {
  const [value, setVal] = useState(init)

  return [value, setVal, ...validate({name, value}, options)]
}

export default useValidate
