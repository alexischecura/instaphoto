import styled from 'styled-components';
import FollowingSection from '../components/home/FollowingSection';
import FolloweesPost from '../components/home/FolloweesPost';

const HomePageStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  @media (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;

const HomePageContent = styled.div`
  margin-top: 4.6rem;
  min-height: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 700px) {
    margin-top: 2rem;
  }
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
