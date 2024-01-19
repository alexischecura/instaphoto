import { useEffect, useRef } from 'react';
import { usePostStore } from '../../hooks/usePostStore';
import PostCard from './PostCard';
import styled from 'styled-components';

const Message = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
`

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
      {followeesPosts ? (
        followeesPosts.map((post) => {
          return (
            <PostCard
              username={post.user.username}
              profilePhoto={post.user.profilePhoto}
              mediaName={post.postPhoto}
              content={post.content}
              likes={post.likes}
              postDate={post.createdAt}
              id={post.id}
              comments={post.comments}
              key={post.id}
            />
          );
        })
      ) : (
        <Message>Appear no one of the users than you are following has a post, try to follow another user</Message>
      )}
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
