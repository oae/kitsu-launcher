import Kitsu from 'kitsu';
import axios from 'axios';
import querystring from 'querystring';
import { message } from 'antd';

import _ from 'lodash';

const KITSU_URL = 'https://kitsu.io/api/oauth/token';
const loginUser = async (username, password) => {
  const loginRes = await axios
    .post(
      KITSU_URL,
      querystring.stringify({
        grant_type: 'password',
        username,
        password,
      })
    )
    .catch(() => {
      message.config({ maxCount: 1 });
      message.error('The provided credentials are invalid.');
    });
  return loginRes && loginRes.data ? loginRes.data : null;
};

const getImage = image => {
  return image && (image.original || image.large || image.small || image.tiny);
};

const getAnimeContent = anime => {
  return {
    id: anime.id,
    meta: {
      title: anime.anime.canonicalTitle,
      synopsis: anime.anime.synopsis,
      type: 'anime',
      releaseDate: anime.anime.startDate,
      popularity: anime.anime.popularityRank,
      rating: anime.anime.ratingRank,
      cover: getImage(anime.anime.coverImage),
      poster: getImage(anime.anime.posterImage),
    },
    progress: {
      totalCount: anime.anime.episodeCount,
      current: {
        number: anime.progress,
        name: 'Gungnir, Once More',
      },
    },
  };
};

const getMangaContent = manga => {
  return {
    id: manga.id,
    meta: {
      title: manga.manga.canonicalTitle,
      synopsis: manga.manga.synopsis,
      type: 'manga',
      releaseDate: manga.manga.startDate,
      popularity: manga.manga.popularityRank,
      rating: manga.manga.ratingRank,
      cover: getImage(manga.manga.coverImage),
      poster: getImage(manga.manga.posterImage),
    },
    progress: {
      totalCount: manga.manga.chapterCount,
      current: {
        number: manga.progress,
        name: 'Gungnir, Once More',
      },
    },
  };
};

const getTrackedAnimes = async ({ keyword, kitsu }) => {
  let filter = {
    userId: kitsu.user.id,
    kind: 'anime',
    status: 'current,on_hold,planned,dropped',
  };

  if (keyword) {
    filter = {
      ...filter,
      title: keyword,
    };
  }

  const libraryData = await kitsu.api.get('libraryEntries', {
    filter,
    page: { limit: 500 },
    include: 'anime',
  });

  return [...libraryData.data].map(anime => getAnimeContent(anime));
};

const getTrackedMangas = async ({ keyword, kitsu }) => {
  let filter = {
    userId: kitsu.user.id,
    kind: 'manga',
    status: 'current,on_hold,planned,dropped',
  };

  if (keyword) {
    filter = {
      ...filter,
      title: keyword,
    };
  }

  const libraryData = await kitsu.api.get('libraryEntries', {
    filter,
    page: { limit: 500 },
    include: 'manga',
  });

  return [...libraryData.data].map(manga => getMangaContent(manga));
};

export const getTrackedContent = async keyword => {
  const result = await Promise.all([
    getTrackedAnimes(keyword),
    getTrackedMangas(keyword),
  ]);

  return _.flatMap(result);
};

const setLocalStrage = userData => {
  if (userData) {
    localStorage.setItem('accessToken', userData.access_token);
    localStorage.setItem('refreshToken', userData.refresh_token);
    localStorage.setItem(
      'expiresDate',
      userData.created_at + userData.expires_in
    );
  }
  const api = new Kitsu({
    headers: {
      Authorization: `Bearer ${userData.access_token}`,
    },
  });

  return Promise.all([api.self(), api]);
};
export const refreshToken = async () => {
  const userData = await axios.post(
    KITSU_URL,
    querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refreshToken'),
    })
  );

  return setLocalStrage(userData.data);
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('expiresDate');
};
export const login = async ({ email, password }) => {
  const userData = await loginUser(email, password);
  return userData ? setLocalStrage(userData) : { user: {}, api: {} };
};
