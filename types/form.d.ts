export interface Field {
  id: string,
  type: string,
  label: string,
  value: string,
  onChange: React.Dispatch<React.SetStateAction<string>>
}

export interface FormContent {
  title: string,
  values: {[key: string]: string},
  fields: Field[]
}
