import { Router } from 'express';
import {
  followAnUser,
  getSuggestedProfiles,
  unfollowAnUser,
} from '../controllers/followController';
import { validate } from '../middlewares/validateRequest';
import { followUserSchema } from '../schemas/followSchema';

const router = Router();

router.get('/suggested', getSuggestedProfiles);
router
  .post('/', validate(followUserSchema, 'body'), followAnUser)
  .delete('/', validate(followUserSchema, 'body'), unfollowAnUser);

export default router;
