import { Menu } from 'antd'
import styled from 'styled-components'

const Background = styled.div`
  height: 100vh;
  background-color: #0578bf;
`

const Navbar = () => {
  return (
    <Menu mode='horizontal' style={{ marginBottom: '40px' }}>
      <Menu.Item key='start'>start</Menu.Item>
      <Menu.Item key='app' disabled>
        logout
      </Menu.Item>
    </Menu>
  )
}

const Layout = ({ children }) => {
  return (
    <Background>
      <Navbar />
      {children}
    </Background>
  )
}

export default Layout
