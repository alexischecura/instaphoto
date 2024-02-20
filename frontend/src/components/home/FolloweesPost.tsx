import { useEffect, useRef } from 'react';
import { usePostStore } from '../../hooks/usePostStore';
import PostCard from '../posts/PostCard';
import styled from 'styled-components';
import Spinner from '../common/Spinner';
import SuggestionUsers from './RecommendedUsers';

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
    <>
      {followeesPosts ? (
        followeesPosts.map((post) => {
          return (
            <PostCard
              username={post.user.username}
              profilePhoto={post.user.profilePhoto}
              userId={post.user.id}
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
        <SuggestionUsers />
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
      {noMoreFriendsPost && followeesPosts && <SuggestionUsers />}
    </>
  );
}

export default FolloweesPost;
