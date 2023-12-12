import styled from 'styled-components';
import FollowingSection from '../components/home/FollowingSection';
import PostCard from '../components/home/PostCard';

const HomePageStyled = styled.section`
  grid-column: 2 / 3;
  grid-row: 1/ -1;

  display: flex;
  gap: 6.4rem;
  justify-content: center;
`;

const HomePageContent = styled.div`
  width: 63rem;
  margin-top: 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function HomePage() {
  return (
    <HomePageStyled>
      <HomePageContent>
        <PostCard />
        <PostCard />
      </HomePageContent>
      <FollowingSection />
    </HomePageStyled>
  );
}

export default HomePage;
