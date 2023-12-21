import { Router } from 'express';
import {
  createPostHandler,
  getFolloweesPostHandler,
  toggleLikeHandler,
} from '../controllers/postController';
import { validate } from '../middlewares/validateRequest';
import {
  createPostSchema,
  postIdSchema,
  postPaginationSchema,
} from '../schemas/postSchema';

const router = Router();

router
  .post('/', validate(createPostSchema, 'body'), createPostHandler)
  .get('/', validate(postPaginationSchema, 'query'), getFolloweesPostHandler);

router
  .get('/:postId', () => {})
  .post('/like/:postId', validate(postIdSchema, 'params'), toggleLikeHandler);

export default router;
