import styled from 'styled-components';
import FollowingSection from '../components/home/FollowingSection';
import FolloweesPost from '../components/home/FolloweesPost';

const HomePageStyled = styled.section`
  grid-column: 2 / 3;
  grid-row: 2/ -1;

  display: grid;
  grid-template-columns: 1fr 0.4fr;
  @media (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;

const HomePageContent = styled.div`
  margin-top: 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function HomePage() {
  return (
    <HomePageStyled>
      <HomePageContent>
        <FolloweesPost />
      </HomePageContent>
      <FollowingSection />
    </HomePageStyled>
  );
}

export default HomePage;
