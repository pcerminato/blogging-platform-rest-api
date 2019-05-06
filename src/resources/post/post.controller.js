import { Post } from './post.model'

export const getPublicAndPrivate = async (req, res) => {
  try {
    const docs = await Post.find()
      .or([{ state: 'public' }, { state: 'private', createdBy: req.user._id }])
      .exec()
    res.status(200).json({ data: docs })
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}

export const getDrafts = async (req, res) => {
  try {
    const docs = await Post.find({
      state: 'draft',
      createdBy: req.user._id
    }).exec()
    res.status(200).json({ data: docs })
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}

export const create = async (req, res) => {
  try {
    const createdBy = req.user._id
    const newDoc = await Post.create({ ...req.body, createdBy })
    res.status(201).json({ data: newDoc })
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}

export const remove = async (req, res) => {}

export const postController = {
  getDrafts,
  getPublicAndPrivate,
  create,
  remove
}
