import { useEffect, useRef } from 'react';
import { usePostStore } from '../../hooks/usePostStore';
import PostCard from '../posts/PostCard';
import styled from 'styled-components';
import Spinner from '../common/Spinner';

const Message = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  padding: 2.4rem 0;
`;

const SpinnerContainer = styled.div`
  text-align: center;
`;

function FolloweesPost() {
  const {
    followeesPosts,
    isLoadingPost,
    noMoreFriendsPost,
    startLoadingMorePost,
    startGettingFolloweesPost,
  } = usePostStore();

  const observedElement = useRef(null);

  useEffect(() => {
    if (noMoreFriendsPost || isLoadingPost) return;
    const initObserver = () => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          startLoadingMorePost();
        }
      });
      if (observedElement.current) observer.observe(observedElement.current);

      return () => {
        // observer.unobserve(observedElement.current);
        observer.disconnect();
      };
    };

    return initObserver();
  }, [followeesPosts, noMoreFriendsPost, isLoadingPost, startLoadingMorePost]);

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
        <Message>
          Appear no one of the users than you are following has a post, try to
          follow another user
        </Message>
      )}
      <div
        ref={observedElement}
        style={{
          height: '1px',
          width: '100%',
        }}
      />
      {isLoadingPost && (
        <SpinnerContainer>
          <Spinner color="#333" />
        </SpinnerContainer>
      )}
      {noMoreFriendsPost && (
        <Message>
          Looks like you've seen everything! You can follow someone else.
        </Message>
      )}
    </div>
  );
}

export default FolloweesPost;
