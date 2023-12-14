import { usePostStore } from '../../hooks/usePostStore';
import PostCard from './PostCard';

function FolloweesPost() {
  const { followeesPosts, isLoadingPost } = usePostStore();

  if (isLoadingPost) return <h1>Loading ...</h1>;

  return (
    <>
      {followeesPosts.map((post) => {
        const { username, profilePhoto } = post.user;

        return (
          <PostCard
            username={username}
            profilePhoto={profilePhoto}
            mediaUrl={post.photoUrl}
            content={post.content}
            likes={post.likes.length}
            postDate={post.createdAt}
            key={post.id}
          />
        );
      })}
    </>
  );
}

export default FolloweesPost;
