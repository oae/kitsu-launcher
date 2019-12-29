import React from 'react';
import styled from 'styled-components';

import { Icon, Tag, Tooltip, Progress as ProgressBar } from 'antd';
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

const StyledMarkAsConsumed = styled.div`
  .overlay {
    position: relative;
  }

  .overlay:hover > :first-child {
    &:after {
      content: '';
      display: block;
      height: 100px;
      width: 75px;
      position: absolute;
      margin-top: -100px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 3px;
      cursor: pointer;
    }
  }

  .overlay .anticon {
    display: none;
  }

  .overlay:hover .anticon {
    position: absolute;
    display: block;
    right: 17.5px;
    bottom: 30px;
    cursor: pointer;
    font-size: 50px;
  }
`;

const MarkAsConsumed = ({ children }) => {
  return (
    <StyledMarkAsConsumed>
      <div className="overlay">
        {children}
        <Icon
          type="check-circle"
          theme="twoTone"
          twoToneColor="rgba(23, 177, 134, 0.7)"
        />
      </div>
    </StyledMarkAsConsumed>
  );
};

const StyledProgress = styled.div`
  margin-top: 10px;

  .anticon {
    color: #622fb5;
  }
`;

const Progress = ({ content }) => {
  return (
    <StyledProgress>
      Ep. {content.progress} of {content.anime.episodeCount} - Episode name
      <ProgressBar
        size="small"
        percent={
          content.anime.episodeCount
            ? (content.progress * 100) / content.anime.episodeCount
            : 100
        }
        status={content.anime.episodeCount ? 'success' : 'active'}
        showInfo={false}
        strokeColor="#17b186"
      />
    </StyledProgress>
  );
};

const StyledDescription = styled.div`
  flex-grow: 1;
  padding: 5px;

  .title {
    margin-top: 0px;
    margin-bottom: 0px;
    color: white;
    font-size: 18px;
  }

  .meta {
    font-size: 12px;
    text-transform: capitalize;
  }
`;

const Description = ({ media }) => {
  const content = media.anime;

  return (
    <StyledDescription>
      <h3 className="title">{content.canonicalTitle}</h3>
      <span className="meta">
        <Tag color="#622fb5">{content.type}</Tag>
        <Tag color="#622fb5">{new Date(content.startDate).getFullYear()}</Tag>
        <Tooltip placement="bottom" title="Most Popular">
          <Tag color="#622fb5">
            <Icon type="heart" theme="filled" style={{ color: 'red' }} />
            &nbsp; Rank #{content.popularityRank}
          </Tag>
        </Tooltip>
        <Tooltip placement="bottom" title="Highest Rated">
          <Tag color="#622fb5">
            <Icon type="star" theme="filled" style={{ color: 'gold' }} />
            &nbsp; Rank #{content.ratingRank}
          </Tag>
        </Tooltip>
      </span>
      <Progress content={media} />
    </StyledDescription>
  );
};

export const Media = () => {
  const content = anime.anime;
  return (
    <StyledMedia cover={content.coverImage.large}>
      <div className="content-info">
        <MarkAsConsumed>
          <Poster src={content.posterImage.medium} />
        </MarkAsConsumed>
        <Description media={anime} />
      </div>
    </StyledMedia>
  );
};
