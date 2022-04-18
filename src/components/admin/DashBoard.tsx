import React from 'react'
import { Spin, Alert, message, Button } from 'antd'
import Layout from '../core/Layout'

const DashBoard = () => {
  const success = () => {
    message.success({
      content: '惊你个头，直接给你一个大嘴巴子',
      style: { width: '500px', height: '100px', margin: '0 auto' }
    })
  }
  return (
    <div>
      <Layout title="用户" subTitle="用户dsahboard">
        <Spin tip="还没做阿扑街!!!!" size="large">
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
        <Button type="primary" onClick={success}>
          点我有惊喜喔!!!
        </Button>
      </Layout>
    </div>
  )
}

export default DashBoard
