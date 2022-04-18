import { Col, Row, Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Descriptions } from 'antd'
import {
  ShoppingCartOutlined,
  UserOutlined,
  OrderedListOutlined
} from '@ant-design/icons'

import Layout from '../core/Layout'

import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
const { Title } = Typography

const AdminDashBoard = () => {
  const {
    user: { email, name }
  } = isAuth() as Jwt

  const adminLinks = () => (
    <>
      <Title level={5}>管理员操作</Title>
      <Menu>
        <Menu.Item key="addcate">
          <ShoppingCartOutlined />
          <Link to="/create/category">添加分类</Link>
        </Menu.Item>
        <Menu.Item key="addpro">
          <UserOutlined />
          <Link to="/create/product">添加产品</Link>
        </Menu.Item>
        <Menu.Item key="addorder">
          <OrderedListOutlined />
          <Link to="/admin/orders">订单列表</Link>
        </Menu.Item>
      </Menu>
    </>
  )

  const adminInfo = () => (
    <Descriptions title="管理员信息" bordered>
      <Descriptions.Item label="昵称" labelStyle={{ background: '#ced6e0' }}>
        {name}
      </Descriptions.Item>
      <Descriptions.Item label="邮件" labelStyle={{ background: '#ced6e0' }}>
        {email}
      </Descriptions.Item>
      <Descriptions.Item label="角色" labelStyle={{ background: '#ced6e0' }}>
        管理员
      </Descriptions.Item>
    </Descriptions>
  )

  return (
    <Layout title="管理员dashboard" subTitle="">
      <Row>
        <Col span="4">{adminLinks()}</Col>
        <Col span="20">{adminInfo()}</Col>
      </Row>
    </Layout>
  )
}

export default AdminDashBoard
