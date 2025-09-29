import React, { useState } from 'react';
import { isAddress } from '@polkadot/util-crypto';

interface AddressInputProps {
  onSubmit: (address: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAddress(address)) {
      setError('Invalid Polkadot address');
      return;
    }

    setError('');
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="input-group">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Polkadot address"
        />
        {error && <div className="error">{error}</div>}
      </div>
      <button type="submit">Track Staking</button>
    </form>
  );
};

export default AddressInput;
