import axios from 'axios';
import queryString from 'query-string';
import { CryptoAssetInterface, CryptoAssetGetQueryInterface } from 'interfaces/crypto-asset';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCryptoAssets = async (
  query?: CryptoAssetGetQueryInterface,
): Promise<PaginatedInterface<CryptoAssetInterface>> => {
  const response = await axios.get('/api/crypto-assets', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCryptoAsset = async (cryptoAsset: CryptoAssetInterface) => {
  const response = await axios.post('/api/crypto-assets', cryptoAsset);
  return response.data;
};

export const updateCryptoAssetById = async (id: string, cryptoAsset: CryptoAssetInterface) => {
  const response = await axios.put(`/api/crypto-assets/${id}`, cryptoAsset);
  return response.data;
};

export const getCryptoAssetById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crypto-assets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCryptoAssetById = async (id: string) => {
  const response = await axios.delete(`/api/crypto-assets/${id}`);
  return response.data;
};
