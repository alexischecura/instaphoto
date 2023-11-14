import { Router } from 'express';
import {
  createUserHandler,
  loginUserHandler,
  verifyUserHandler,
} from '../controllers/authController';
import { validate } from '../middlewares/validateRequest';
import {
  createUserSchema,
  loginUserSchema,
  verificationCodeSchema,
} from '../schemas/userSchema';

const router = Router();

router
  .post('/signup', validate(createUserSchema, 'body'), createUserHandler)
  .get(
    '/verification/:code',
    validate(verificationCodeSchema, 'params'),
    verifyUserHandler
  );

router.post('/login', validate(loginUserSchema, 'body'), loginUserHandler);

export default router;
