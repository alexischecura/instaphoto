import styled from 'styled-components';
import FollowingSection from '../components/layout/FollowingSection';

const HomePageStyled = styled.section`
  grid-column: 2 / 3;
  grid-row: 1/ -1;

  display: flex;
  gap: 6.4rem;
  justify-content: center;
`;

const HomePageContent = styled.div`
  width: 63rem;
  text-align: center;
`;

function HomePage() {
  return (
    <HomePageStyled>
      <HomePageContent>HomePage</HomePageContent>
      <FollowingSection />
    </HomePageStyled>
  );
}

export default HomePage;
