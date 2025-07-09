import { Model } from "mongoose"

export interface IAddress{
    city:string,
    street:string,
    zip:number
}

export interface Iuser {
    firstName : string,
    lastName:string,
    email:string,
    age:number,
    password:string,
    role:'USER'|'ADMIN'|'SUPERADMIN',
    address:IAddress
}

export interface UserInstanceMethods{
    hashPassword(password:string):string
}

export interface UserStaticMethods extends Model<Iuser>{
    hashPassword(password:string):string
}