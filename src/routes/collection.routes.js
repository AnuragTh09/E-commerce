import { Router } from 'express'
import { createCollection, deleteCollection, getAllCollection, updateCollection } from '../controllers/collection.controller.js'
import { authorize, isLoggedIn } from '../middlewares/auth.middleware.js'
import AuthRoles from '../utils/authRoles.js'

const router = Router()

router.post('/', isLoggedIn, authorize(AuthRoles.ADMIN), createCollection)

router.put('/:id', isLoggedIn, authorize(AuthRoles.ADMIN), updateCollection)

router.delete('/:id', isLoggedIn, authorize(AuthRoles.ADMIN), deleteCollection)

router.get('/:id', getAllCollection)


export default router;