export interface Categories{
    [key:string] : number | string
}

export interface Currencies{
    [key:string] : number | string
}

export interface DefaultCurrency{
    [key:string] : null | number
}

export type MyAddExpenseFormProps = {
    categories : Categories[],
    currencies : Currencies[],
    defaultCurrency : number
}

export interface FormData {
    "amount" : number,
    "category" : number,
    "currency" : number,
    "date" : Date,
    "details" : string | undefined,
    "paymentMethod" : string | undefined
}

export interface LoginFormData {
    "username": string,
    "password":string
}