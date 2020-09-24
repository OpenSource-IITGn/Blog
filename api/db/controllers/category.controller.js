import Category from '../models/category.model'

export const createCategory = async (req, res) => {
  const { label, description } = req.body
  const newCategory = await Category.query().insert({
    label,
    description,
  })
  res.json(newCategory)
}

export const deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id)
  const deletedCategory = await Category.query().deleteById(id)

  if (deletedCategory) {
    res.status(204).send()
  } else {
    res.status(400).json({ error: 'Invalid id' })
  }
}

export const updateCategory = async (req, res) => {
  const { label, description } = req.body
  const id = parseInt(req.params.id)

  const updatedCategory = await Category.query().updateAndFetchById(id, {
    label,
    description,
  })
  res.json(updatedCategory)
}
