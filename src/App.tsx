import React, { useState } from 'react';
import AddressInput from './components/AddressInput';
import StakingInfo from './components/StakingInfo';
import ValidatorsList from './components/ValidatorsList';
import { usePolkadotApi } from './hooks/usePolkadotApi';
import { StakingInfo as StakingInfoType, Validator } from './types/staking';

const App: React.FC = () => {
  const { api, isLoading: apiLoading, error: apiError } = usePolkadotApi();
  const [stakingInfo, setStakingInfo] = useState<StakingInfoType | null>(null);
  const [validators, setValidators] = useState<Validator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStakingInfo = async (address: string) => {
    if (!api) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch staking information
      const [account, era, validators] = await Promise.all([
        api.query.system.account(address),
        api.query.staking.currentEra(),
        api.query.session.validators()
      ]);

      const accountData: any = account.toJSON();
      const eraData: any = era.toJSON();

      // Get validator details
      const validatorDetails = await Promise.all(
        (validators as any).map(async (validatorId: string) => {
          const prefs = await api.query.staking.validators(validatorId);
          const exposure = await api.query.staking.erasStakers(eraData, validatorId);
          
          return {
            address: validatorId,
            totalStake: exposure.total.toString(),
            commission: (prefs as any).commission.toString(),
            isActive: true
          };
        })
      );

      setStakingInfo({
        address,
        totalStaked: accountData.data.free,
        rewards: '0', // You would need to calculate this from events
        era: eraData,
        stakingRate: '7.5' // This would need to be calculated
      });

      setValidators(validatorDetails);
    } catch (err) {
      setError('Failed to fetch staking information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (apiLoading) {
    return <div className="loading">Connecting to Polkadot network...</div>;
  }

  if (apiError) {
    return <div className="error">{apiError}</div>;
  }

  return (
    <div className="container">
      <h1>Polkadot Staking Tracker</h1>
      <AddressInput onSubmit={fetchStakingInfo} />
      
      {loading && <div className="loading">Loading staking information...</div>}
      {error && <div className="error">{error}</div>}
      
      {stakingInfo && <StakingInfo info={stakingInfo} />}
      {validators.length > 0 && <ValidatorsList validators={validators} />}
    </div>
  );
};

export default App;
