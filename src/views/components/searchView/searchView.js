import React from 'react';
import styled from 'styled-components';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Media } from '../media/media';

const SearchInput = styled.input`
  position: absolute;
  z-index: 2;
  width: 370px;
  height: 60px;
  border-radius: 10px;
  padding: 10px;
  padding-left: 140px;
  border: 1px solid #3b064d;
  font-size: 30px;
  color: white;
  outline: none;
  background: #3b064d;
  box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
`;

const StyledSearchView = styled.div`
  padding: 15px;
`;

const StyledSearchResults = styled(OverlayScrollbarsComponent)`
  width: 390px;
  max-height: 400px;
  margin-left: 120px;
  border-bottom-left-radius: 0px;
  box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
  border-bottom-right-radius: 0px;
  border-radius: 5px;
  position: relative;
  margin-top: 75px;
`;

const SearchResults = () => {
  return (
    <StyledSearchResults>
      <Media />
    </StyledSearchResults>
  );
};

export const SearchView = () => {
  return (
    <StyledSearchView>
      <SearchInput
        type="text"
        autoFocus
        onFocus={e => {
          e.currentTarget.select();
        }}
      />
      <SearchResults />
    </StyledSearchView>
  );
};
