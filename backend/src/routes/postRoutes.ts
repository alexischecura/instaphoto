import { Router } from 'express';
import {
  createPostHandler,
  getFolloweesPostHandler,
  toggleLikeHandler,
  commentPostHandler,
} from '../controllers/postController';
import { validate } from '../middlewares/validateRequest';
import {
  commentSchema,
  createPostSchema,
  postIdSchema,
  postPaginationSchema,
} from '../schemas/postSchema';

const router = Router();

router
  .post('/', validate(createPostSchema, 'body'), createPostHandler)
  .get('/', validate(postPaginationSchema, 'query'), getFolloweesPostHandler);

router
  .get('/:postId', validate(postIdSchema, 'params'), () => {})
  .post('/:postId/like', validate(postIdSchema, 'params'), toggleLikeHandler)
  .post(
    '/:postId/comment',
    validate(postIdSchema, 'params'),
    validate(commentSchema, 'body'),
    commentPostHandler
  );

export default router;
