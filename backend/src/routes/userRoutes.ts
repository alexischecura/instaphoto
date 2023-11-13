import { Router } from 'express';
import { createUserHandler } from '../controllers/authController';
import { validate } from '../middlewares/validateRequest';
import { createUserSchema } from '../schemas/userSchema';

const router = Router();

router.post('/signup', validate(createUserSchema, 'body'), createUserHandler);

export default router;
