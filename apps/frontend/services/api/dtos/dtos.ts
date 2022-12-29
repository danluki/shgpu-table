export interface AddAdvertisingDto {
  text: string;
  faculties: number[];
  adminId: number;
  totalCount: number;
  sendDate: Date;
}

export interface AdvertisingDto extends AddAdvertisingDto {
  id: number;
}
