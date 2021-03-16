export interface Warehouse{
  _id: string,
  storeId: any,
  storage: Storage[]
}

interface Storage{
  productId: any,
  categoryId: string,
  amount: number
}