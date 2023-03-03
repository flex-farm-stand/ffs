import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineLogin, MdOutlineLogout, MdSell } from 'react-icons/md'
import styled from 'styled-components'

import { Menu } from '@/features/ui'
import { useAuth } from '@/features/users'

let authLogout = null

const optionsLoggedIn = [
  {
    displayName: 'Inventory',
    icon: MdSell,
    onClick: null,
    to: '/inventory',
  },
  {
    displayName: 'Profile',
    icon: FaRegUser,
    onClick: null,
    to: '/profile',
  },
  {
    displayName: 'Logout',
    icon: MdOutlineLogout,
    onClick: authLogout,
    to: null,
  },
]

const optionsLoggedOut = [
  {
    displayName: 'Login',
    icon: MdOutlineLogin,
    name: 'login',
    onClick: null,
    to: '/login',
  },
  {
    displayName: 'Sign up',
    icon: FaRegUser,
    name: 'sign-up',
    onClick: null,
    to: '/signup',
  },
]

// ---
function ItemGeneral({ displayName, icon, onClick, to }) {
  const Icon = icon
  return (
    <Menu.Item icon={Icon} onClick={onClick} to={to}>
      {displayName}
    </Menu.Item>
  )
}

// ---
function MenuButton({ className }) {
  return (
    <Menu.Button className={className}>
      <BsThreeDotsVertical />
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
  }
  li:last-child {
    border-radius: 0 0 5px 5px;
  }
`

export function MenuGeneral() {
  const auth = useAuth()
  authLogout = auth.logout
  const options = auth.user ? optionsLoggedIn : optionsLoggedOut

  return (
    <Menu>
      <StyledMenuButton />
      <StyledMenuItems>
        {options.map(({ displayName, icon, onClick, to }) => (
          <ItemGeneral
            displayName={displayName}
            icon={icon}
            key={displayName}
            name={name}
            onClick={onClick}
            to={to}
          />
        ))}
      </StyledMenuItems>
    </Menu>
  )
}
