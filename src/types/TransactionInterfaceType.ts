export interface Categories{
    [key:string] : number | string
}

export interface Currencies{
    [key:string] : number | string
}

export interface DefaultCurrency{
    [key:string] : null | number
}

export interface TransactionFormProps{
    categories : Categories[],
    currencies : Currencies[],
    defaultCurrency? : number,
    existingTransaction? : TransactionDetails[]
}

export interface EditTransactionFormProps{
    transaction: TransactionDetails[],
    categories: Categories[]
}

export interface ResetPasswordFormProps{
    token : string
}

export interface ChartData{
    [key:string]:string | number
}

export interface ChartProps{
    [key:string]: ChartData[]
}
export interface ChartFigureProps{
    chartData: ChartData[],
    currencyId : number
}

export interface ChartDetailsProps{
    detailsData: ChartData[],
    chartData: ChartData[],
    currencyId : number
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

export interface RegisterFormData {
    "username": string,
    "email" : string,
    "password":string
}

export interface ForgotPasswordFormData {
    "email" : string
}

export interface ResetPasswordFormData{
    "password" : string
}
export interface TransactionDetails {
    [key:string] : number | string,
}

export interface DateTransactionsMap {
    [key:string] : TransactionDetails[]
}

export interface TransactionsDashboardProps{
    transactions:DateTransactionsMap
}

export interface TransactionRecordProps{
    dailyTransactions:TransactionDetails[],
    date: string
    userDefaultCurrency: number
}

export interface TransactionSummaryProps{
    dateTransactionsMap : DateTransactionsMap,
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
    transactions:DateTransactionsMap,
    currencies: Currencies[],
    userDefaultCurrency: number
}

export interface GroupedTransactions{
    [key: string]: TransactionDetails[]
}

export interface ChartFilterProps{
    updateChartComponent : Function
}