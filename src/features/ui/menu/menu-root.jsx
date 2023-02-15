import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { MenuContext } from './menu-context'

function VanillaMenuRoot({ className, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, menuRef])

  function toggle() {
    setIsOpen(!isOpen)
  }

  return (
    <MenuContext.Provider value={{ isOpen, toggle }}>
      <div className={className} ref={menuRef}>
        {children}
      </div>
    </MenuContext.Provider>
  )
}

export const MenuRoot = styled(VanillaMenuRoot).attrs({
  className: 'menu-root',
})`
  position: relative;
`
