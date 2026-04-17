export enum UserRole {
  buyer = "buyer",
  seller = "seller",
}

export type LoginUserSchema = {
  email: string;
  password: string;
};

export type CreateUserSchema = {
  email: string;
  password: string;
  name: string;
  mobileNumber: string;
  role: UserRole;
};
