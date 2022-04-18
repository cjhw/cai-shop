import { Button, Col, Divider, Form, Input, Row, Select } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/actions/category.action'
import { searchProduct } from '../../store/actions/product.actions'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
import { ProductState } from '../../store/reducers/product.reducer'
import ProductItem from './ProductItem'

const Search = () => {
  const dispatch = useDispatch()

  const { category } = useSelector<AppState, CategoryState>(
    (state) => state.category
  )

  const { search } = useSelector<AppState, ProductState>(
    (state) => state.product
  )

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  const onFinish = (value: { category: string; search: string }) => {
    dispatch(searchProduct({ category: value.category, search: value.search }))
  }

  return (
    <>
      <Form
        onFinish={onFinish}
        layout="inline"
        initialValues={{ category: 'All' }}
      >
        <Input.Group compact>
          <Form.Item name="category">
            <Select>
              <Select.Option value="All">所有分类</Select.Option>
              {category.result.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="search">
            <Input placeholder="请输入搜索关键字" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">搜索</Button>
          </Form.Item>
        </Input.Group>
      </Form>
      <Divider />
      <Row gutter={[16, 16]}>
        {search.map((item) => (
          <Col key={item._id} span="6">
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Search
