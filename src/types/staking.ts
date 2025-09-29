export interface StakingInfo {
  address: string;
  totalStaked: string;
  rewards: string;
  era: number;
  stakingRate: string;
}

export interface Validator {
  address: string;
  totalStake: string;
  commission: string;
  isActive: boolean;
}
