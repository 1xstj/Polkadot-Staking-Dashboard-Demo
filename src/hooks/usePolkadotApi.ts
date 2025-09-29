import { useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';

const POLKADOT_ENDPOINT = 'wss://rpc.polkadot.io';

export const usePolkadotApi = () => {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const connectApi = async () => {
      try {
        const provider = new WsProvider(POLKADOT_ENDPOINT);
        const api = await ApiPromise.create({ provider });
        setApi(api);
      } catch (err) {
        setError('Failed to connect to Polkadot network');
      } finally {
        setIsLoading(false);
      }
    };

    connectApi();

    return () => {
      if (api) {
        api.disconnect();
      }
    };
  }, []);

  return { api, isLoading, error };
};
