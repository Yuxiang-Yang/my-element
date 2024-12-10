import type { App, Plugin } from 'vue'

type SFCWithInstall<T> = T & Plugin

export function withInstall<T, E extends Record<string, any>>(main: T, extra?: E) {
  ;(main as SFCWithInstall<T>).install = (app: App): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}

export function withInstallFunction<T>(fn: T, name: string) {
  ;(fn as SFCWithInstall<T>).install = (app: App) => {
    app.config.globalProperties[name] = fn
  }

  return fn as SFCWithInstall<T>
}
