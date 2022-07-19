export type UserListEl = {
  username: string,
  added: boolean
}

export type UsersFoundAction = {type:'set', value:UserListEl[]} | {type:'add' | 'remove', index:number}

export type UsersFoundState = {list:UserListEl[], count:number}
