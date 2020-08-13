import { Router } from 'express';

import UserRouter from './userRoute';

// Init router and path
const router = Router();

router.use('/users', UserRouter);

// Export the base-router
export default router;
