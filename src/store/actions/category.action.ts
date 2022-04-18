import { GET_CATEGORY, GET_CATEGORY_SUCCESS } from './constants'
import { Category } from '../models/category'

export interface GetCategoryAction {
  type: typeof GET_CATEGORY
}

export interface GetCategorySuccessAction {
  type: typeof GET_CATEGORY_SUCCESS
  payload: Category[]
}

export const getCategory = (): GetCategoryAction => ({
  type: GET_CATEGORY
})

export const getCategorySuccess = (
  payload: Category[]
): GetCategorySuccessAction => ({
  type: GET_CATEGORY_SUCCESS,
  payload
})

export type CategoryUnionType = GetCategoryAction | GetCategorySuccessAction
