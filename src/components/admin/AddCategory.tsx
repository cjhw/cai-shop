import { Button, Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuth } from '../../helpers/auth'
import request from '../../request/request'
import { Jwt } from '../../store/models/auth'
import Layout from '../core/Layout'

const AddCategory = () => {
  const [name, setname] = useState('')

  const { user, token } = isAuth() as Jwt

  useEffect(() => {
    async function addCategory() {
      try {
        let response = await request.post<{ name: string }>(
          `/category/create/${user._id}`,
          {
            name: name
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        message.success(`[${response.data.name}] 分类添加成功`)
      } catch (error: any) {
        message.error(error.response.data.error)
      }
    }
    if (name) {
      addCategory()
    }
  }, [name])

  const onFinish = (value: { name: string }) => {
    console.log(value)
    setname(value.name)
  }

  return (
    <Layout title="添加分类" subTitle="">
      <Form onFinish={onFinish}>
        <Form.Item name="name" label="分类名称">
          <Input></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加分类
          </Button>
        </Form.Item>
      </Form>
      <Button>
        <Link to="/admin/dashboard">返回 dashboar页面</Link>
      </Button>
    </Layout>
  )
}

export default AddCategory
