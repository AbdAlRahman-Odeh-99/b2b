export interface Product{
  _id: string,
  name: string,
  storeId?: string,
  price?: number,
  image?: string,
  categoryId?: any,
  productType?: string,
  description?: string,
  offer?: any,
  isInStock?: boolean,
  tags?: string
}