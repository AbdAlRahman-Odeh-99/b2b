export interface Contact{
  _id: string,
  name: string,
  ownerId: string,
  contacts: Contacts[]
}

interface Contacts{
  name: string,
  id: string
}