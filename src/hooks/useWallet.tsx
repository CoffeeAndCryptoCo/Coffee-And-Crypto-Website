import { useActiveAccount, useConnect, useDisconnect } from 'thirdweb/react';
import { createWallet } from 'thirdweb/wallets';
import { client } from '../providers/ThirdwebProvider';

export const useWallet = () => {
  const account = useActiveAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = async (walletType: string) => {
    try {
      let wallet;
      
      switch (walletType) {
        case 'metamask':
          wallet = createWallet('io.metamask');
          break;
        case 'coinbase':
          wallet = createWallet('com.coinbase.wallet');
          break;
        case 'trustwallet':
          wallet = createWallet('com.trustwallet.app');
          break;
        case 'walletconnect':
          wallet = createWallet('walletConnect');
          break;
        default:
          wallet = createWallet('io.metamask');
      }

      await connect(async () => {
        await wallet.connect({ client });
        return wallet;
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  return {
    address: account?.address,
    isConnected: !!account,
    connect: connectWallet,
    disconnect,
    account,
  };
};