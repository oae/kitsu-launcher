import React from 'react';
import styled from 'styled-components';

import { Icon, Tag } from 'antd';
import { anime } from '../../../providers/kitsu/kitsu.mock';

const StyledMedia = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  color: white;
  outline: none;
  position: relative;
  display: flex;

  &:first-child {
    padding-top: 13px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(${props => props.cover});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: blur(2px);
    padding: 5px;
    z-index: -1;
  }

  .content-info {
    z-index: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex-grow: 1;
  }
`;

const StyledPoster = styled.div`
  padding: 5px;
  flex-grow: 0;

  img {
    width: 75px;
    height: 100px;
    border-radius: 3px;
    box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.5);
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

  .title {
    margin-top: 0px;
    margin-bottom: 0px;
    color: white;
  }

  .meta {
    font-size: 12px;
    text-transform: capitalize;
  }
`;
const Description = ({ content }) => {
  return (
    <StyledDescription>
      <h3 className="title">{content.canonicalTitle}</h3>
      <span className="meta">
        <Tag color="#3b064d">{content.type}</Tag>
        <Tag color="#3b064d">{new Date(content.startDate).getFullYear()}</Tag>
        <Tag color="#3b064d">
          <Icon type="heart" theme="filled" style={{ color: 'red' }} />
          &nbsp; Rank #{content.popularityRank}
        </Tag>
        <Tag color="#3b064d">
          <Icon type="star" theme="filled" style={{ color: 'gold' }} />
          &nbsp; Rank #{content.ratingRank}
        </Tag>
      </span>
    </StyledDescription>
  );
};

export const Media = () => {
  const content = anime.anime;
  return (
    <StyledMedia cover={content.coverImage.large}>
      <div className="content-info">
        <Poster src={content.posterImage.medium} />
        <Description content={content} />
      </div>
    </StyledMedia>
  );
};
