import type { InjectionKey } from 'vue'
import type { collapseItemContext } from './types'

export const collapseContextKey: InjectionKey<collapseItemContext> = Symbol('collapseContextKey')
