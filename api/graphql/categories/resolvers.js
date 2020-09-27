import errorHandler from '../../db/exceptions/db'
import Category from './../../db/models/category.model'

export const getCategoryByLabel = async (label) => {
  try {
    const category = await Category.query().where('label', label).throwIfNotFound()
    return { category: category[0] }
  } catch (err) {
    const { type, message } = errorHandler(err)
    return { type, msg: message }
  }
}
