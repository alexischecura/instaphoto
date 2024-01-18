import { Router } from 'express';
import {
  createUserHandler,
  forgotPasswordHandler,
  loginUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from '../controllers/authController';
import {
  createManyUsersHandler,
  getCurrentUserHandler,
  getProfile,
  updateProfile,
} from '../controllers/userController';

import { validate } from '../middlewares/validateRequest';
import {
  createManyUsersSchema,
  createUserSchema,
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
  updateUserSchema,
  usernameSchema,
  verificationCodeSchema,
} from '../schemas/userSchema';
import { authenticateUser } from '../middlewares/authenticateUser';
import { savePhotoInMemory } from '../middlewares/multerUpload';
import { resizeProfilePhotoAndSave } from '../middlewares/resizeProfilePhotoAndSave';

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
router.get(
  '/profile/:username',
  validate(usernameSchema, 'params'),
  getProfile
);

router.use(authenticateUser);

router.get('/me', getCurrentUserHandler);
router.patch(
  '/updateMe',
  validate(updateUserSchema, 'body'),
  savePhotoInMemory,
  resizeProfilePhotoAndSave,
  updateProfile
);

router.post(
  '/createManyUsers',
  validate(createManyUsersSchema, 'body'),
  createManyUsersHandler
);

router.get('/private', (req, res) => {
  res.status(200).json({ message: 'You access to a private route' });
});

export default router;
