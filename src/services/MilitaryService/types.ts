export type CreateMilitaryRequest = {
  userId: string;
  warName: string;
  email: string;
  grad: string;
  cia: string;
  pel: string;
  phone: string;
};

export type MilitaryResponse = {
  id: string;
  warName: string;
  email: string;
  grad: string;
  cia: string;
  pel: string;
  phone: string;
  status: string;
};
