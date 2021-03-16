export interface Order{
  _id: string,
  shoppingCart?: any,
  deliveryAddress?: string,
  phoneNumber: string,
  carOwnerId: any,
  date: Date,
  status: string,
  storeId: any
}