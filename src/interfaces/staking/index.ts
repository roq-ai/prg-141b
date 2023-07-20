import { CryptoAssetInterface } from 'interfaces/crypto-asset';
import { GetQueryInterface } from 'interfaces';

export interface StakingInterface {
  id?: string;
  reward: number;
  crypto_asset_id?: string;
  created_at?: any;
  updated_at?: any;

  crypto_asset?: CryptoAssetInterface;
  _count?: {};
}

export interface StakingGetQueryInterface extends GetQueryInterface {
  id?: string;
  crypto_asset_id?: string;
}
