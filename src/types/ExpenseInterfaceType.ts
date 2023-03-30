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
    defaultCurrency : DefaultCurrency
}