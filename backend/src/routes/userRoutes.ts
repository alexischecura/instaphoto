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

router.use(authenticateUser);

router.get('/private', (req, res) => {
  res.status(200).json({ message: 'You access to a private route' });
});

export default router;
