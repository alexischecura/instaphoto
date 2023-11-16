import { Router } from 'express';
import {
  createUserHandler,
  forgotPasswordHandler,
  loginUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from '../controllers/authController';
import { validate } from '../middlewares/validateRequest';
import {
  createUserSchema,
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from '../schemas/userSchema';
import { authenticateUser } from '../middlewares/authenticateUser';

const router = Router();

router
  .post('/signup', validate(createUserSchema, 'body'), createUserHandler)
  .get(
    '/verification/:code',
    validate(verificationCodeSchema, 'params'),
    verifyUserHandler
  );

router.post('/login', validate(loginUserSchema, 'body'), loginUserHandler);

router
  .post(
    '/forgotPassword',
    validate(forgotPasswordSchema, 'body'),
    forgotPasswordHandler
  )
  .patch(
    '/resetPassword/:code',
    validate(verificationCodeSchema, 'params'),
    validate(resetPasswordSchema, 'body'),
    resetPasswordHandler
  );

router.use(authenticateUser);

router.get('/private', (req, res) => {
  res.status(200).json({ message: 'You access to a private route' });
});

export default router;
