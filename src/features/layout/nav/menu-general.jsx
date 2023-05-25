import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineLogin, MdOutlineLogout, MdSell } from 'react-icons/md'
import styled from 'styled-components'

import { Menu } from '@/features/ui'
import { useIsAuthenticated, useLogout } from '@/features/users'

const optionsLoggedIn = [
  {
    displayName: 'Inventory',
    icon: MdSell,
    name: 'inventory',
    to: '/inventory',
  },
  {
    displayName: 'Profile',
    icon: FaRegUser,
    name: 'profile',
    to: '/profile',
  },
  {
    displayName: 'Logout',
    icon: MdOutlineLogout,
    name: 'logout',
    to: null,
  },
]

const optionsLoggedOut = [
  {
    displayName: 'Login',
    icon: MdOutlineLogin,
    name: 'login',
    to: '/login',
  },
  {
    displayName: 'Sign up',
    icon: FaRegUser,
    name: 'sign-up',
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
  const { data, isLoading } = useIsAuthenticated()
  const logoutMutation = useLogout()
  const options = data ? optionsLoggedIn : optionsLoggedOut

  return (
    <Menu>
      <StyledMenuButton />
      {!isLoading && (
        <StyledMenuItems>
          {options.map(({ displayName, icon, name, to }) => (
            <ItemGeneral
              displayName={displayName}
              icon={icon}
              key={displayName}
              name={name}
              onClick={name === 'logout' ? logoutMutation.mutate : null}
              to={to}
            />
          ))}
        </StyledMenuItems>
      )}
    </Menu>
  )
}
