// Inspired by the following blog posts:
// https://www.jonathan-harrell.com/blog/system-based-theming-with-styled-components/
// https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/
import { createContext, useContext, useEffect, useState } from 'react'

const classNameDark = 'dark-theme'
const classNameLight = 'light-theme'
const darkThemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
const initialValueTheme = window.localStorage.getItem('dark-theme') || 'auto'
const initialValueEffectiveTheme =
  initialValueTheme === 'light' || initialValueTheme === 'dark'
    ? initialValueTheme
    : darkThemeQuery.matches
    ? 'dark'
    : 'light'

export const DarkModeContext = createContext({
  theme: '',
  effectiveTheme: '',
  setTheme: () => {},
})

export function useDarkMode() {
  const [theme, setTheme] = useState(initialValueTheme)
  const [effectiveTheme, setEffectiveTheme] = useState(
    initialValueEffectiveTheme
  )

  useEffect(() => {
    darkThemeQuery.addListener(handleQueryChange)
    return () => darkThemeQuery.removeListener(handleQueryChange)
  })
  function applyTheme(newTheme) {
    switch (newTheme) {
      case 'light':
        setLight()
        break
      case 'dark':
        setDark()
        break
      case 'auto':
        setAuto()
        break
      default:
        throw new Error('Unsupported dark theme value')
    }
    setTheme(newTheme)
    window.localStorage.setItem('dark-theme', newTheme)
  }
  function handleQueryChange(e) {
    theme === 'auto' && e.matches ? setDark() : setLight()
  }
  function setLight() {
    document.querySelector('html').classList.remove(classNameDark)
    document.querySelector('html').classList.add(classNameLight)
    setEffectiveTheme('light')
  }
  function setDark() {
    document.querySelector('html').classList.remove(classNameLight)
    document.querySelector('html').classList.add(classNameDark)
    setEffectiveTheme('dark')
  }
  function setAuto() {
    darkThemeQuery.matches ? setDark() : setLight()
  }

  return [theme, effectiveTheme, applyTheme]
}

export function useDarkModeContext() {
  return useContext(DarkModeContext)
}
