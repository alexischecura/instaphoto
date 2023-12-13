import { Router } from 'express';
import {
  createPostHandler,
  getFolloweesPostHandler,
} from '../controllers/postController';
import { validate } from '../middlewares/validateRequest';
import { createPostSchema } from '../schemas/postSchema';

const router = Router();

router
  .post('/', validate(createPostSchema, 'body'), createPostHandler)
  .get('/', getFolloweesPostHandler)
  .get('/:postId', () => {});

export default router;
