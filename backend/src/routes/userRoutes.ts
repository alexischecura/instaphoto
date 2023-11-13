import { Router } from 'express';
import {
  createUserHandler,
  verifyUserHandler,
} from '../controllers/authController';
import { validate } from '../middlewares/validateRequest';
import {
  createUserSchema,
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

export default router;
