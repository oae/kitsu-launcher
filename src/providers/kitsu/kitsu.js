import Kitsu from 'kitsu';
import axios from 'axios';
import querystring from 'querystring';
import debug from 'debug';

const log = debug('[kitsu]');

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

export const getTrackedAnimes = async () => {
  const userData = await loginUser();
  const api = new Kitsu({
    headers: {
      Authorization: `Bearer ${userData.access_token}`,
    },
  });
  const user = await api.self();

  const libraryData = await api.get('libraryEntries', {
    filter: { userId: `${user.id}`, kind: 'anime' },
    page: { limit: 500 },
    include: 'anime,manga',
    kind: 'anime',
  });

  log(libraryData);

  return libraryData;
};

export const getTrackedMangas = async () => {
  const userData = await loginUser();
  const api = new Kitsu({
    headers: {
      Authorization: `Bearer ${userData.access_token}`,
    },
  });
  const user = await api.self();

  const libraryData = await api.get('libraryEntries', {
    filter: { userId: `${user.id}`, kind: 'manga' },
    page: { limit: 500 },
    include: 'anime,manga',
  });

  log(libraryData);

  return libraryData;
};
