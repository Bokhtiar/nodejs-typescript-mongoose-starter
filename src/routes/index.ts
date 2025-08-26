import { Router } from 'express';
import { adminAuthRouter } from './admin/admin.routes';

const router = Router();

router.use('/admin', adminAuthRouter);

export const AppRouter = router;
