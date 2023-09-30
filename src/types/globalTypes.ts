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
  _id?: string;
  title: string;
  genre: string;
  photo: string;
  author: string;
  seller_email?: string;
  price: number;
  publication_date: string;
  description: string;
  reviews?: string[];
}
