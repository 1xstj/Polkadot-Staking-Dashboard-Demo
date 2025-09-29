import React from 'react';
import { Validator } from '../types/staking';

interface ValidatorsListProps {
  validators: Validator[];
}

const ValidatorsList: React.FC<ValidatorsListProps> = ({ validators }) => {
  return (
    <div className="card">
      <h2>Active Validators</h2>
      <div className="validators-list">
        {validators.map((validator, index) => (
          <div key={index} className="validator-item">
            <p>Address: {validator.address}</p>
            <p>Total Stake: {validator.totalStake} DOT</p>
            <p>Commission: {validator.commission}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValidatorsList;
