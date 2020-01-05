import React from 'react';
import styled from 'styled-components';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'antd';
import { Content } from '../content/content';

const SearchInput = styled.input`
  position: absolute;
  z-index: 2;
  width: calc(100% - 170px);
  height: 60px;
  border-radius: 3px;
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
  width: 500px;
  max-height: 370px;
  margin-left: 145px;
  border-bottom-left-radius: 0px;
  box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
  border-bottom-right-radius: 0px;
  border-radius: 3px;
  position: relative;
  margin-top: 75px;

  .os-padding {
    max-height: 380px !important;
    min-height: 135px !important;
  }
`;

const SearchResults = ({ results }) => {
  return (
    <StyledSearchResults
      options={{
        overflowBehavior: {
          x: 'hidden',
        },
        scrollbars: {
          autoHide: 'scroll',
        },
      }}
    >
      {results.map(content => (
        <Content content={content} key={content.id} />
      ))}
    </StyledSearchResults>
  );
};

const Loading = styled(Icon)`
  position: absolute;
  right: 20px;
  z-index: 10;
  color: white;
  font-size: 50px;
  top: 31px;
`;

export const SearchView = () => {
  const search = useSelector(state => state.search);
  const dispatch = useDispatch();

  return (
    <StyledSearchView>
      <SearchInput
        type="text"
        autoFocus
        onFocus={e => {
          e.currentTarget.select();
        }}
        onKeyPress={async e => {
          if (e.key !== 'Enter') return;
          dispatch({
            type: 'CONTENT_SEARCH_REQUESTED',
            payload: e.currentTarget.value,
          });
        }}
      />
      {search.isLoading && <Loading type="loading" />}
      <SearchResults results={search.result} />
    </StyledSearchView>
  );
};
