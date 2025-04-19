import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'

export interface FormItemProps {
  label?: string
  prop?: string
}
export type TriggerEvents = 'blur' | 'change' | 'input'
export interface FormItemRule extends RuleItem {
  trigger?: TriggerEvents
}

export type FormRules = Record<string, FormItemRule[]>
export type FormModel = Record<string, any>
export interface FormProps {
  model: FormModel
  rules?: FormRules
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
  removeField: (prop: string) => void
}

export interface FormValidateFailure {
  errors: null | ValidateError[]
  fields: ValidateFieldsError
}
export interface ValidateStatusProp {
  state: 'init' | 'success' | 'error'
  errorMsg: string
  loading: boolean
}
export interface FormItemContext {
  prop: string
  validate: (trigger?: TriggerEvents) => Promise<any>
  clearValidate: () => void
  resetField: () => void
}

export interface FormInstance {
  validate: () => Promise<any>
  resetFields: (props?: string[]) => void
  clearValidate: (props?: string[]) => void
}

export interface FormItemInstance {
  validateStatus: ValidateStatusProp
  validate: (trigger?: TriggerEvents) => Promise<any>
  clearValidate: () => void
  resetField: () => void
}
