export interface LoginState {
  username: string;
  roles: string[];
  token: string;
}

export const initialState:LoginState = {
  username:undefined,
  roles: [],
  token:undefined
};
