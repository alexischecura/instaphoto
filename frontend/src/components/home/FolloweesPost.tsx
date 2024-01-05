import { useEffect, useRef } from 'react';
import { usePostStore } from '../../hooks/usePostStore';
import PostCard from './PostCard';

function FolloweesPost() {
  const {
    followeesPosts,
    isLoadingPost,
    startLoadingMorePost,
    startGettingFolloweesPost,
  } = usePostStore();

  const observedElement = useRef(null);

  useEffect(() => {
    const initObserver = () => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          startLoadingMorePost();
        }
      });
      if (observedElement.current) observer.observe(observedElement.current);

      return () => observer.disconnect();
    };

    if (followeesPosts.length > 0) {
      return initObserver();
    }
  }, [followeesPosts]);

  useEffect(() => {
    startGettingFolloweesPost();
  }, []);

  return (
    <div>
      {followeesPosts.map((post) => {
        return (
          <PostCard
            username={post.user.username}
            profilePhoto={post.user.profilePhoto}
            mediaUrl={post.photoUrl}
            content={post.content}
            likes={post.likes}
            postDate={post.createdAt}
            id={post.id}
            comments={post.comments}
            key={post.id}
          />
        );
      })}
      <div
        ref={observedElement}
        style={{
          height: '1px',
          width: '100%',
        }}
      />
      {isLoadingPost && <h1>Loading ...</h1>}
    </div>
  );
}

export default FolloweesPost;
