import React from 'react';
import { StakingInfo as StakingInfoType } from '../types/staking';

interface StakingInfoProps {
  info: StakingInfoType;
}

const StakingInfo: React.FC<StakingInfoProps> = ({ info }) => {
  return (
    <div className="card">
      <h2>Staking Information</h2>
      <div>
        <p>Address: {info.address}</p>
        <p>Total Staked: {info.totalStaked} DOT</p>
        <p>Total Rewards: {info.rewards} DOT</p>
        <p>Current Era: {info.era}</p>
        <p>Staking Rate: {info.stakingRate}%</p>
      </div>
    </div>
  );
};

export default StakingInfo;
