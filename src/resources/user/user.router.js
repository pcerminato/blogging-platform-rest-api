import { Router } from 'express'
import { getData, update } from './user.controller'

const router = Router()

router.get('/', getData)
router.put('/', update)

export default router
