export interface ISignUp {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IProduct {
  _id: string;
  name: string;
  genre: string;
  photo: string;
  seller_name: string;
  seller_email: string;
  price: number;
  description: string;
  reviews: string[];
}
