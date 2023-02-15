// Inspired by the following blog posts:
// https://www.jonathan-harrell.com/blog/system-based-theming-with-styled-components/
// https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/

/* eslint-disable-next-line no-extra-semi */
;(function () {
  var classNameDark = 'dark-theme'
  var classNameLight = 'light-theme'
  function setClassOnDocument(darkMode) {
    document
      .querySelector('html')
      .classList.add(darkMode ? classNameDark : classNameLight)
    document
      .querySelector('html')
      .classList.remove(darkMode ? classNameLight : classNameDark)
  }

  const preferDarkQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(preferDarkQuery)
  const mode = localStorage.getItem('dark-theme')

  if (mode === 'light' || mode === 'dark') setClassOnDocument(mode === 'dark')
  else setClassOnDocument(mql.matches)
})()
