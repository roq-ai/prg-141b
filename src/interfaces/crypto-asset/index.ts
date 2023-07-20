import { StakingInterface } from 'interfaces/staking';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CryptoAssetInterface {
  id?: string;
  name: string;
  value: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  staking?: StakingInterface[];
  organization?: OrganizationInterface;
  _count?: {
    staking?: number;
  };
}

export interface CryptoAssetGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
