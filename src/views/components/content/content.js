import React from 'react';
import styled from 'styled-components';

import { Icon, Tag, Tooltip, Progress as ProgressBar } from 'antd';

import placeHolderCover from '../../../assets/placholder_cover.png';
import placeHolderPoster from '../../../assets/placholder_poster.png';

const ContentTitle = ({ title }) => {
  return <span title={title}>{title}</span>;
};

const ContentSynopsis = ({ synopsis }) => {
  return (
    <Tooltip
      placement="rightBottom"
      title={synopsis}
      overlayStyle={{ minWidth: 400, padding: 20 }}
    >
      <Icon type="eye" theme="filled" style={{ marginLeft: 5, fontSize: 15 }} />
    </Tooltip>
  );
};

const ContentType = ({ type }) => {
  return (
    <Tag
      style={{ color: 'black' }}
      color={type === 'anime' ? '#00ffdc' : '#fff700'}
    >
      {type}
    </Tag>
  );
};

const ContentReleaseDate = ({ date }) => {
  return <Tag color="#622fb5">{new Date(date).getFullYear()}</Tag>;
};

const ContentPopularity = ({ rank }) => {
  return (
    <Tooltip placement="bottom" title="Most Popular">
      <Tag color="#622fb5">
        <Icon type="heart" theme="filled" style={{ color: 'red' }} />
        &nbsp; Popularity #{rank}
      </Tag>
    </Tooltip>
  );
};

const ContentRating = ({ rating }) => {
  return (
    <Tooltip placement="bottom" title="Highest Rated">
      <Tag color="#622fb5">
        <Icon type="star" theme="filled" style={{ color: 'gold' }} />
        &nbsp; Rating #{rating}
      </Tag>
    </Tooltip>
  );
};

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
      <img src={src || placeHolderPoster} />
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
  padding: 5px;

  .anticon {
    color: #622fb5;
  }
`;

const Progress = ({ progress }) => {
  const { totalCount, current } = progress;
  return (
    <StyledProgress>
      No. {current.number} {totalCount && ` of ${totalCount}`}
      {current.name && ` - ${current.name}`}
      <ProgressBar
        size="small"
        percent={totalCount ? (current.number * 100) / totalCount : 100}
        status={totalCount ? 'success' : 'active'}
        showInfo={false}
        strokeColor="#17b186"
      />
    </StyledProgress>
  );
};

const StyledMeta = styled.div`
  flex-grow: 1;
  padding: 5px;

  .media-header {
    margin-top: 0px;
    margin-bottom: 0px;
    color: white;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta {
    font-size: 12px;
    text-transform: capitalize;
  }
`;

const Meta = ({ meta }) => {
  const { title, synopsis, type, releaseDate, popularity, rating } = meta;
  return (
    <StyledMeta>
      <h3 className="media-header">
        <ContentTitle title={title} />
        <ContentSynopsis synopsis={synopsis} />
      </h3>
      <span className="meta">
        <ContentType type={type} />
        <ContentReleaseDate date={releaseDate} />
        <ContentPopularity rank={popularity} />
        <ContentRating rating={rating} />
      </span>
    </StyledMeta>
  );
};

const StyledContent = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  color: white;
  outline: none;
  position: relative;
  display: flex;
  background: rgba(0, 0, 0, 1);

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
      url(${props => props.cover || placeHolderCover});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: blur(2px);
  }

  .content-info {
    z-index: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex-grow: 1;
    overflow-x: hidden;
  }

  .content-info .bottom {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    overflow-x: hidden;
  }
`;

export const Content = ({ content }) => {
  const { meta, progress } = content;
  return (
    <StyledContent cover={meta.cover}>
      <div className="content-info">
        <MarkAsConsumed>
          <Poster src={meta.poster} />
        </MarkAsConsumed>
        <div className="bottom">
          <Meta meta={meta} />
          <Progress progress={progress} />
        </div>
      </div>
    </StyledContent>
  );
};
