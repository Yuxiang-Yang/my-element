import { withInstallFunction } from '@/utils'
import Message from './method'

export const ChMessage = withInstallFunction(Message, '$message')

export * from './types'
