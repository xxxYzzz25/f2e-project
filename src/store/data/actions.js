import axios from 'axios';
import { message } from 'antd';
export const GET_REPOSITORIES_PENDING = 'GET_REPOSITORIES_PENDING';
export const GET_REPOSITORIES_SUCCESS = 'GET_REPOSITORIES_SUCCESS';
export const GET_REPOSITORIES_FAILURE = 'GET_REPOSITORIES_FAILURE';

function fetchData(data) {
  const url = `https://api.github.com/search/repositories?q=${data.name}+language:${data.language}&sort=stars&order=${data.sort}&per_page=10&page=${data.current}`;
  return axios.get(url);
}

export const getRepositories = (params) => async (dispatch) => {
  dispatch({
    type: GET_REPOSITORIES_PENDING,
  });
  try {
    const res = await fetchData(params);
    dispatch({
      type: GET_REPOSITORIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_REPOSITORIES_FAILURE,
    });
    message.error(err.message, 10);
  }
};
