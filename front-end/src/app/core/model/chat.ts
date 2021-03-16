export interface Chat{
  _id: string,
  contactBetween?: string,
  messages: Message[]
}

export interface Message{
  text: string,
  date: string,
  reply?: boolean,
  user: User,
}

interface User{
  name: string,
  receiver: string,
  sender: string
}