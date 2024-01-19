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
import { resizePostPhotoAndSave } from '../middlewares/resizePostPhotoAndSave';
import { loadFormData } from '../middlewares/multerUpload';

const router = Router();

router
  .post(
    '/',
    loadFormData,
    validate(createPostSchema, 'body'),
    resizePostPhotoAndSave,
    createPostHandler
  )
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
