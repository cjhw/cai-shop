import { Menu, Badge } from 'antd'
import { RouterState } from 'connected-react-router'
import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppState } from '../../store/reducers'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { TotalContext } from '../../anotherStore'
import { itemCount } from '../../helpers/cart'

function useActive(currentPath: string, path: string): string {
  return currentPath === path ? 'ant-menu-item-selected' : ''
}

const Navigation = () => {
  const router = useSelector<AppState, RouterState>((state) => state.router)
  const pathname = router.location.pathname
  const isHome = useActive(pathname, '/')
  const isShop = useActive(pathname, '/shop')
  const isSignin = useActive(pathname, '/signin')
  const isSignup = useActive(pathname, '/signup')
  const isDashBoard = useActive(pathname, getDashBoardUrl())
  const isCart = useActive(pathname, '/cart')

  const [count, setCount] = useContext(TotalContext)

  useEffect(() => {
    setCount(itemCount())
  })

  function getDashBoardUrl() {
    let url = '/user/dashboard'
    if (isAuth()) {
      const {
        user: { role }
      } = isAuth() as Jwt
      if (role === 1) {
        url = '/admin/dashboard'
      }
    }
    return url
  }
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" className={isHome}>
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="shop" className={isShop}>
        <Link to="/shop">商城</Link>
      </Menu.Item>
      <Menu.Item className={isCart}>
        <Link to="/cart">
          购物车
          <Badge count={count} offset={[5, -10]} />
        </Link>
      </Menu.Item>
      {!isAuth() && (
        <>
          <Menu.Item key="signin" className={isSignin}>
            <Link to="/signin">登录</Link>
          </Menu.Item>
          <Menu.Item key="signup" className={isSignup}>
            <Link to="/signup">注册</Link>
          </Menu.Item>
        </>
      )}
      {isAuth() && (
        <Menu.Item key="dashboard" className={isDashBoard}>
          <Link to={getDashBoardUrl()}>dashboar</Link>
        </Menu.Item>
      )}
    </Menu>
  )
}

export default Navigation
