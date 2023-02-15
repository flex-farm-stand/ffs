import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import {
  MdOutlineLightMode,
  MdOutlineLogin,
  MdOutlineLogout,
  MdOutlineNightlightRound,
} from 'react-icons/md'

import styled from 'styled-components'

import { Menu, useDarkModeContext } from '@/features/ui'
import { useAuth } from '@/features/users'

// ---
function MenuButton({ className }) {
  return (
    <Menu.Button className={className}>
      <BsThreeDotsVertical />
    </Menu.Button>
  )
}
const StyledMenuButton = styled(MenuButton)`
  color: ${({ theme: { header } }) => header.text};
`

// ---
function MenuItemAuth({ auth }) {
  return auth.user ? (
    <>
      <Menu.Item Icon={FaRegUser} to="/profile">
        Profile
      </Menu.Item>
      <Menu.Item Icon={MdOutlineLogout} onClick={auth.logout}>
        Logout
      </Menu.Item>
    </>
  ) : (
    <>
      <Menu.Item Icon={MdOutlineLogin} to="/login">
        Login
      </Menu.Item>
      <Menu.Item Icon={FaRegUser} to="/signup">
        Sign up
      </Menu.Item>
    </>
  )
}

// ---
function MenuItemTheme({ theme, setTheme }) {
  const options = [
    {
      value: 'light',
      label: <MdOutlineLightMode />,
      onClick: () => setTheme('light'),
    },
    { value: 'auto', label: 'Auto', onClick: () => setTheme('auto') },
    {
      value: 'dark',
      label: <MdOutlineNightlightRound />,
      onClick: () => setTheme('dark'),
    },
  ]
  return <Menu.ItemMultiClick currentOption={theme} options={options} />
}

// ---
const StyledMenuItems = styled(Menu.Items)`
  & {
    right: 0;
  }
  li:last-child {
    background-color: inherit;
    border-radius: 0 0 5px 5px;
    padding: 0;
  }
`

export function StyledMenu() {
  const auth = useAuth()
  const { theme, setTheme } = useDarkModeContext()

  return (
    <Menu>
      <StyledMenuButton />
      <StyledMenuItems>
        <MenuItemAuth auth={auth} />
        <MenuItemTheme setTheme={setTheme} theme={theme} />
      </StyledMenuItems>
    </Menu>
  )
}
