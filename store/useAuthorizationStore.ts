import {create} from 'zustand';
import {PublicKey} from '@solana/web3.js';
import {toUint8Array} from 'js-base64';
import {
  Account as AuthorizedAccount,
  AuthorizationResult,
  AuthorizeAPI,
  ReauthorizeAPI,
  DeauthorizeAPI,
} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {Account, Authorization, IAccount} from './interfaces';
import {APP_IDENTITY} from './services';

const getAccountFromAuthorizedAccount = (
  account: AuthorizedAccount,
): Account => ({
  ...account,
  publicKey: new PublicKey(toUint8Array(account.address)),
});

const getAuthorizationFromAuthorizationResult = (
  authorizationResult: AuthorizationResult,
  previouslySelectedAccount?: Account | null,
): Authorization => {
  let activeAccount: Account | null = null;
  if (
    !previouslySelectedAccount ||
    !authorizationResult.accounts.some(
      ({address}) => address === previouslySelectedAccount.address,
    )
  ) {
    const firstAccount = authorizationResult.accounts[0];
    activeAccount = getAccountFromAuthorizedAccount(firstAccount);
  } else {
    activeAccount = previouslySelectedAccount;
  }
  return {
    accounts: authorizationResult.accounts.map(getAccountFromAuthorizedAccount),
    authToken: authorizationResult.auth_token,
    activeAccount,
  };
};
export interface AuthorizationState extends Authorization {
  accounts: [];
  authToken: string;
  activeAccount: IAccount | null;

  authorizeSession: (
    wallet: AuthorizeAPI & ReauthorizeAPI,
  ) => Promise<Account | null>;
  deauthorizeSession: (wallet: DeauthorizeAPI) => void;
  onChangeAccount: (nextSelectedAccount: IAccount) => void;
}

export const useAuthorizationStore = create<AuthorizationState>((set, get) => ({
  accounts: [],
  authToken: '',
  activeAccount: null,
  authorizeSession: async wallet => {
    const {authToken, activeAccount} = get();
    const authorizationResult = await (authToken
      ? wallet.reauthorize({auth_token: authToken, identity: APP_IDENTITY})
      : wallet.authorize({identity: APP_IDENTITY}));
    const nextAuthorization = getAuthorizationFromAuthorizationResult(
      authorizationResult,
      activeAccount,
    );
    return nextAuthorization.activeAccount;
  },

  deauthorizeSession: async wallet => {
    const {authToken} = get();
    if (!authToken) {
      return;
    }
    await wallet.deauthorize({auth_token: authToken});
    set({accounts: [], authToken: '', activeAccount: null});
  },

  onChangeAccount: nextSelectedAccount => {
    set({activeAccount: nextSelectedAccount});
  },
}));
