import { BsCircleHalf, BsMoon, BsSun } from 'react-icons/bs'
import styled from 'styled-components'

import { Menu, useDarkModeContext } from '@/features/ui'

const options = [
  { name: 'light', Icon: BsSun },
  { name: 'dark', Icon: BsMoon },
  { name: 'auto', Icon: BsCircleHalf },
]

// ---
function MenuButton({ className, themeName }) {
  const Icon = options.filter(({ name }) => name === themeName)[0].Icon
  return (
    <Menu.Button className={className}>
      <Icon />
    </Menu.Button>
  )
}
const StyledMenuButton = styled(MenuButton)`
  color: ${({ theme }) => theme.nav.text};
`

// ---
const StyledMenuItems = styled(Menu.Items)`
  & {
    right: 0;
    width: 75px;
  }
  li:last-child {
    border-radius: 0 0 5px 5px;
  }
`

export function MenuColor() {
  const { theme, setTheme } = useDarkModeContext()

  return (
    <Menu>
      <StyledMenuButton themeName={theme} />
      <StyledMenuItems>
        {options.map(({ name, Icon }) => (
          <Menu.Item
            active={theme === name}
            icon={Icon}
            key={name}
            onClick={() => setTheme(name)}
          >
            {name}
          </Menu.Item>
        ))}
      </StyledMenuItems>
    </Menu>
  )
}
