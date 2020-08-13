import { Router } from 'express';

import { joiValidator } from '@middlewares/joi';
import { userSchema } from '@shared/userSchema';
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '@controllers/userController';

// Init router and path
const router = Router();

// Add sub-routes
router.get('/', getAllUsers);
router.get('/:id', getUser);

router.post('/', [joiValidator(userSchema)], createUser);

router.put('/:id', [joiValidator(userSchema)], updateUser);

router.delete('/:id', [joiValidator(userSchema)], deleteUser);

export default router;
