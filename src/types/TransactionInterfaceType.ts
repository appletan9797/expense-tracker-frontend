export interface Categories{
    [key:string] : number | string
}

export interface Currencies{
    [key:string] : number | string
}

export interface DefaultCurrency{
    [key:string] : null | number
}

export type MyAddTransactionFormProps = {
    categories : Categories[],
    currencies : Currencies[],
    defaultCurrency : number
}

export interface EditTransactionFormProps{
    transaction: TransactionDetails[],
    categories: Categories[]
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

export interface TransactionDetails {
    [key:string] : number | string,
}

export interface TransactionsDashboardProps {
    [key:string] : TransactionDetails[]
}

export interface TransactionRecordProps{
    dailyTransactions:TransactionDetails[],
    date: string
    userDefaultCurrency: number
}

export interface TransactionSummaryProps{
    monthlyTransactions : TransactionDetails[],
    currencies:Currencies[],
    userDefaultCurrency: number
    updateTransactionComponent: Function
}

export interface TransactionFilterProps{
    currencies: Currencies[],
    userDefaultCurrency: number
    updateTransactionSummaryComponent: Function
}

export interface TransactionComponentProps{
    loading: boolean,
    transactions:TransactionDetails[],
    currencies: Currencies[],
    userDefaultCurrency: number
}