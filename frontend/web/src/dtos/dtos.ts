export interface Admin {
  name: string;
  id: number;
  access_token: string;
}

export interface LoginResponse {
  name: string;
  id: number;
  access_token: string;
}

export interface LoginDto {
  login: string;
  pass: string;
}

export interface AddAdvertisingDto {
  text: string;
  faculties: number[];
  totalCount: number;
  sendDate: Date;
}

export interface AdvertisingDto extends AddAdvertisingDto {
  id: number;
}
