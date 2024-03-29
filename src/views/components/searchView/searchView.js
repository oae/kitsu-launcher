import { Icon } from 'antd';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debug from 'debug';
import _ from 'lodash';
import styled from 'styled-components';
import { HotKeys, configure } from 'react-hotkeys';
import { Content } from '../content/content';

const logger = debug('search-view');

const StyledSearchInput = styled.input`
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

const SearchInput = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  return (
    <StyledSearchInput
      spellCheck={false}
      type="text"
      autoFocus
      onFocus={e => e.currentTarget.select()}
      onChange={e => setKeyword(e.currentTarget.value)}
      onKeyPress={e => e.key === 'Enter' && onSearch({ keyword })}
    />
  );
};

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

const SearchResults = ({ results, selectedItem }) => {
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
        <Content
          isSelected={selectedItem === content.id}
          content={content}
          key={content.id}
        />
      ))}
    </StyledSearchResults>
  );
};

const StyledLoading = styled(Icon)`
  position: absolute;
  right: 20px;
  z-index: 10;
  color: white;
  font-size: 50px;
  top: 31px;
`;

const Loading = () => {
  const search = useSelector(state => state.search);

  return search.isLoading && <StyledLoading type="loading" />;
};
export const SearchView = () => {
  const kitsu = useSelector(state => state.kitsu);
  const search = useSelector(state => state.search);
  const selectedItem = useSelector(state => state.selectedItem);
  const dispatch = useDispatch();

  configure({
    ignoreTags: [],
  });

  return (
    <HotKeys
      keyMap={{ GO_DOWN: 'ArrowDown', GO_UP: 'ArrowUp' }}
      handlers={{
        GO_DOWN: e => {
          e.preventDefault();
          logger('GO_DOWN');
          if (!search.result || search.result.length === 0) return;
          const nextItemIndex =
            _.findIndex(search.result, item => item.id === selectedItem) + 1;
          dispatch({
            type: 'SELECT_ITEM',
            payload: search.result[nextItemIndex % search.result.length].id,
          });
        },
        GO_UP: e => {
          e.preventDefault();
          logger('GO_UP');
          if (!search.result || search.result.length === 0) return;
          const prevItemIndex =
            _.findIndex(search.result, item => item.id === selectedItem) - 1;
          dispatch({
            type: 'SELECT_ITEM',
            payload: search.result[prevItemIndex % search.result.length].id,
          });
        },
      }}
    >
      <StyledSearchView>
        <SearchInput
          onSearch={({ keyword }) =>
            dispatch({
              type: 'CONTENT_SEARCH_REQUESTED',
              payload: {
                keyword,
                kitsu,
              },
            })
          }
        />
        <Loading />
        <SearchResults selectedItem={selectedItem} results={search.result} />
      </StyledSearchView>
    </HotKeys>
  );
};
