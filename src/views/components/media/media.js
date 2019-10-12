import React from 'react';
import styled from 'styled-components';
import { anime } from '../../../providers/kitsu/kitsu.mock';

const StyledMedia = styled.div`
  &:first-child {
    padding-top: 12px;
  }

  padding-left: 5px;
  padding-right: 5px;
  background: #3b064d;
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  outline: none;
`;

const StyledPoster = styled.div`
  padding: 5px;
  flex-grow: 0;

  img {
    width: 75px;
    height: 100px;
    border-radius: 3px;
  }
`;

const Poster = ({ src }) => {
  return (
    <StyledPoster>
      <img src={src} />
    </StyledPoster>
  );
};

const StyledDescription = styled.div`
  flex-grow: 1;
  padding: 5px;

  h4 {
    margin-top: 0px;
  }
`;
const Description = ({ content }) => {
  return (
    <StyledDescription>
      <h4>{content.canonicalTitle}</h4>
    </StyledDescription>
  );
};

export const Media = () => {
  const content = anime.anime;
  return (
    <StyledMedia>
      <Poster src={content.posterImage.tiny} />
      <Description content={content} />
    </StyledMedia>
  );
};
