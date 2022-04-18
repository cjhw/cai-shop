import React, { useEffect } from 'react'
import { Typography, Row, Col } from 'antd'

import Layout from './Layout'
import Search from './Search'
import ProductItem from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../store/actions/product.actions'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
const { Title } = Typography

const Home = () => {
  const dispatch = useDispatch()

  const { createdAt, sold } = useSelector<AppState, ProductState>(
    (state) => state.product
  )

  useEffect(() => {
    dispatch(getProduct('createdAt'))
    dispatch(getProduct('sold'))
  }, [dispatch])

  return (
    <Layout title="菜菜商城" subTitle="冲冲冲">
      <Search></Search>
      <Title level={5}>最新上架</Title>
      <Row gutter={[16, 16]}>
        {createdAt.products.map((item) => (
          <Col key={item._id} span="6">
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
      <Title level={5}>最受欢迎</Title>
      <Row gutter={[16, 16]}>
        {sold.products.map((item) => (
          <Col key={item._id} span="6">
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default Home
