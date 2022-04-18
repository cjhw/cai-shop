import { put, takeEvery } from 'redux-saga/effects'

import request from '../../request/request'
import {
  SignupAction,
  signupFail,
  signupSuccess,
  SigninAction,
  signinFail,
  signinSuccess
} from '../actions/auth.action'
import { SIGNIN, SIGNUP } from '../actions/constants'
import { ResponseGenerator } from '../../Generators/res.generator'

function* handleSignup(action: SignupAction) {
  try {
    yield request.post('/signup', action.payload)
    yield put(signupSuccess())
  } catch (error: any) {
    yield put(signupFail(error.response.data.error))
  }
}

function* handleSignin(action: SigninAction) {
  try {
    let response: ResponseGenerator = yield request.post(
      '/signin',
      action.payload
    )
    localStorage.setItem('jwt', JSON.stringify(response.data))
    yield put(signinSuccess())
  } catch (error: any) {
    yield put(signinFail(error.response.data.error))
  }
}

export default function* authSaga() {
  yield takeEvery(SIGNUP, handleSignup)
  yield takeEvery(SIGNIN, handleSignin)
}
