export interface IUser {
  id: number;
  username?: string;
  email: string;
  password: string;
  role: string;
  last_name: string;
  first_name: string;
  verification_code: string;
  verified: 0 | 1; // boolean, but mysql treats it as number
  created_at: string;
  verified_at?: string;
}

export interface IDecodedToken {
  id: number;
  email: string;
}
