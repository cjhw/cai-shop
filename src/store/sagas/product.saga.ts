import { put, takeEvery } from 'redux-saga/effects'
import { ResponseGenerator } from '../../Generators/res.generator'
import request from '../../request/request'
import {
  FILTER_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCT_BY_ID,
  SEARCH_PRODUCT
} from '../actions/constants'
import {
  FilterProductAction,
  filterProductSuccess,
  GetProductAction,
  GetProductByIdAction,
  getProductSuccess,
  SearchProductAction,
  SearchProductSuccess,
  getProductByIdSuccess
} from '../actions/product.actions'
import { Product } from '../models/product'

function* handleGetProduct({ sortBy, order, limit }: GetProductAction) {
  let response: ResponseGenerator = yield request.get<Product[]>('/products', {
    params: {
      sortBy,
      order,
      limit
    }
  })
  yield put(getProductSuccess(response.data, sortBy))
}

function* handleSearchProduct({
  payload: { search, category }
}: SearchProductAction) {
  let response: ResponseGenerator = yield request.get('/products/search', {
    params: {
      search,
      category
    }
  })
  yield put(SearchProductSuccess(response.data))
}

function* handleFilterProduct(action: FilterProductAction) {
  let response: ResponseGenerator = yield request.post(
    '/products/filter',
    action.payload
  )
  yield put(filterProductSuccess(response.data, action.payload.skip))
}

function* handleGetProductById(action: GetProductByIdAction) {
  let response: ResponseGenerator = yield request.get(
    `/product/${action.payload.productId}`
  )
  yield put(getProductByIdSuccess(response.data))
}

export default function* productSaga() {
  yield takeEvery(GET_PRODUCT, handleGetProduct)
  yield takeEvery(SEARCH_PRODUCT, handleSearchProduct)
  yield takeEvery(FILTER_PRODUCT, handleFilterProduct)
  yield takeEvery(GET_PRODUCT_BY_ID, handleGetProductById)
}
