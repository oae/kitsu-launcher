import Kitsu from 'kitsu';
import axios from 'axios';
import querystring from 'querystring';
import _ from 'lodash';

const loginUser = async () => {
  const loginRes = await axios.post(
    'https://kitsu.io/api/oauth/token',
    querystring.stringify({
      grant_type: 'password',
      username: process.env.KITSU_USER,
      password: process.env.KITSU_PASS,
    })
  );

  return loginRes.data;
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

export const login = async () => {
  const userData = await loginUser();
  const api = new Kitsu({
    headers: {
      Authorization: `Bearer ${userData.access_token}`,
    },
  });

  return Promise.all([api.self(), api]);
};
