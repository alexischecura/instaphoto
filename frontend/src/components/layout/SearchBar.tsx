import { IoSearch } from 'react-icons/io5';
import styled from 'styled-components';

const SearchFormStyled = styled.form`
  align-self: center;
  justify-self: center;
  padding: 0 2.4rem;
`;

const InputContainer = styled.div`
  border-radius: 4px;
  outline: 1px solid var(--color-gray-900);
  width: 28rem;

  position: relative;
  display: flex;
  align-items: center;
  height: 3rem;
`;

const Label = styled.label`
  width: fit-content;
  margin-left: 1rem;
  & svg {
    height: 1.8rem;
    width: 1.8rem;
    color: var(--color-gray-900);
  }
`;
const Input = styled.input`
  width: 100%;
  padding-left: 3px;
  border: none;
  color: var(--color-black-900);
  font-size: 1.5rem;
  font-family: inherit;

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }

  &::placeholder {
    color: var(--color-gray-900);
  }
  &:focus {
    outline: none;
  }
`;

function SearchBar() {
  return (
    <SearchFormStyled>
      <InputContainer>
        <Label htmlFor="search-input">
          <IoSearch />
        </Label>
        <Input
          type="search"
          name="search"
          id="search-input"
          placeholder="Search"
        />
      </InputContainer>
    </SearchFormStyled>
  );
}

export default SearchBar;
