export interface Iuser {
    firstName : string,
    lastName:string,
    email:string,
    age:number,
    password:string,
    role:'user'|'admin'
}