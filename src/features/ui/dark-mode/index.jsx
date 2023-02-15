import { useEffect, useState } from 'react'

const classNameDark = 'dark-mode'
const classNameLight = 'light-mode'
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
const initialValueMode = window.localStorage.getItem('dark-mode')
const initialValueEffectiveMode =
  initialValueMode === 'light' || initialValueMode === 'dark'
    ? initialValueMode
    : darkModeQuery.matches
    ? 'dark'
    : 'light'

// Inspired by the following blog posts:
// https://www.jonathan-harrell.com/blog/system-based-theming-with-styled-components/
// https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/
export function useDarkMode() {
  const [mode, setMode] = useState(initialValueMode)
  const [effectiveMode, setEffectiveMode] = useState(initialValueEffectiveMode)

  useEffect(() => {
    darkModeQuery.addListener(handleQueryChange)
    return () => darkModeQuery.removeListener(handleQueryChange)
  })
  function applyMode(newMode) {
    switch (newMode) {
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
        throw new Error('Unsupported dark mode value')
    }
    setMode(newMode)
    window.localStorage.setItem('dark-mode', newMode)
  }
  function handleQueryChange(e) {
    mode === 'auto' && e.matches ? setDark() : setLight()
  }
  function setLight() {
    document.querySelector('html').classList.remove(classNameDark)
    document.querySelector('html').classList.add(classNameLight)
    setEffectiveMode('light')
  }
  function setDark() {
    document.querySelector('html').classList.remove(classNameLight)
    document.querySelector('html').classList.add(classNameDark)
    setEffectiveMode('dark')
  }
  function setAuto() {
    darkModeQuery.matches ? setDark() : setLight()
  }

  return [mode, effectiveMode, applyMode]
}
