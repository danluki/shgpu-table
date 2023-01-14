export interface Admin {
  login: string;
  id: number;
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
