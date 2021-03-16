export interface Subscription{
  _id: string,
  userId?: any,
  endpoint?: string,
  expirationTime?: Date,
  keys?: Keys
}

interface Keys{
  auth: string,
  p256dh: string
}