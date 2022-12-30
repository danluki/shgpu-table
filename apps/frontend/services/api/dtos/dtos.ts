export interface AddAdvertisingDto {
  text: string;
  faculties: number[];
  totalCount: number;
  sendDate: Date;
}

export interface AdvertisingDto extends AddAdvertisingDto {
  id: number;
}
