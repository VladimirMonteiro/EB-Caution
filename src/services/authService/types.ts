export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterRequest = {
  warName: string;
  email: string;
  password: string;
  role: String;
  grad: string;
};
