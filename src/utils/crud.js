/**
 * Generic crud operations
 * which will be implemented for the specific passed in model
 */

const create = model => async (req, res) => {}

const read = model => async (req, res) => {}

const readMany = model => async (req, res) => {}

const update = model => async (req, res) => {}

const remove = model => async (req, res) => {}

export const crudGenericControllers = model => ({
  create: create(model),
  read: read(model),
  readMany: readMany(model),
  remove: remove(model),
  update: update(model)
})
