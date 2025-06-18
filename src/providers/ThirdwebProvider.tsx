import React from 'react';
import { ThirdwebProvider as Provider } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';

const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || "team_cmbpd74re01q4aj0kngaqumxr"
});

interface ThirdwebProviderProps {
  children: React.ReactNode;
}

export function ThirdwebProvider({ children }: ThirdwebProviderProps) {
  return (
    <Provider client={client}>
      {children}
    </Provider>
  );
}

export { client };