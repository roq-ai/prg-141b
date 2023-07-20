import axios from 'axios';
import queryString from 'query-string';
import { StakingInterface, StakingGetQueryInterface } from 'interfaces/staking';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getStakings = async (query?: StakingGetQueryInterface): Promise<PaginatedInterface<StakingInterface>> => {
  const response = await axios.get('/api/stakings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createStaking = async (staking: StakingInterface) => {
  const response = await axios.post('/api/stakings', staking);
  return response.data;
};

export const updateStakingById = async (id: string, staking: StakingInterface) => {
  const response = await axios.put(`/api/stakings/${id}`, staking);
  return response.data;
};

export const getStakingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/stakings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStakingById = async (id: string) => {
  const response = await axios.delete(`/api/stakings/${id}`);
  return response.data;
};
