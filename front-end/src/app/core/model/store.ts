export interface Store{
  _id: string,
  userId: string,
  storeIdCopy?: string,
  name: string,
  address: string,
  image?: string,
  description: string,
  openTime: string,
  closeTime: string,
  location: Geolocation
  menu?: any,
  warehouse?: any, 
  tags: string,
  orders?: any,
  garageOwnerId?: any 
}