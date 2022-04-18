import { put, takeEvery } from 'redux-saga/effects'

import request from '../../request/request'
import { GET_CATEGORY } from '../actions/constants'
import { Category } from '../models/category'
import { ResponseGenerator } from '../../Generators/res.generator'
import { getCategorySuccess } from '../actions/category.action'

function* handleGetCategory() {
  let response: ResponseGenerator = yield request.get<Category[]>('/categories')
  yield put(getCategorySuccess(response.data))
}

export default function* categorysaga() {
  yield takeEvery(GET_CATEGORY, handleGetCategory)
}
