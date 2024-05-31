import {create} from 'zustand';
import {PublicKey} from '@solana/web3.js';
import {toUint8Array} from 'js-base64';
import {
  Account,
  Account as AuthorizedAccount,
  AuthorizationResult,
  AuthorizeAPI,
  ReauthorizeAPI,
  DeauthorizeAPI,
} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {Authorization, IAccount} from './interfaces';
import {APP_IDENTITY} from './services';

const mapAuthorizedAccount = (account: AuthorizedAccount): Account => ({
  ...account,
  publicKey: new PublicKey(toUint8Array(account.address)),
});

const mapAuthorizationResult = (
  authorizationResult: AuthorizationResult,
  previouslySelectedAccount?: IAccount | null,
): Authorization => {
  let activeAccount: IAccount | null = null;
  const accounts = authorizationResult.accounts;
  if (
    !previouslySelectedAccount ||
    !accounts.some(({address}) => address === previouslySelectedAccount.address)
  ) {
    activeAccount = mapAuthorizedAccount(accounts[0]);
  } else {
    activeAccount = previouslySelectedAccount;
  }
  return {
    accounts: accounts.map(mapAuthorizedAccount),
    authToken: authorizationResult.auth_token,
    activeAccount,
  };
};
export interface AuthorizationState extends Authorization {
  accounts: [];
  authToken: string | null;
  activeAccount: IAccount | null;

  authorizeSession: (
    wallet: AuthorizeAPI & ReauthorizeAPI,
  ) => Promise<IAccount | null>;
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
    const nextAuthorization = mapAuthorizationResult(
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
    set({accounts: [], authToken: undefined, activeAccount: null});
  },

  onChangeAccount: nextSelectedAccount => {
    set({activeAccount: nextSelectedAccount});
  },
}));
