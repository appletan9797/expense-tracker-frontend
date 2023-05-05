export interface Categories{
    category_name_en : string,
    category_name_cn : string,
    [key:string] : number | string
}

export interface DataObject{
    [key:string] : number | string
}

export interface DefaultCurrency{
    [key:string] : null | number
}

export interface TransactionFormProps{
    categories : Categories[],
    currencies : DataObject[],
    defaultCurrency? : number,
    existingTransaction? : TransactionDetails,
    userId? : number
}

export interface AddTransactionFormProps{
    categories: Categories[],
    userId: number
}

export interface EditTransactionFormProps{
    transaction: TransactionDetails[],
    categories: Categories[]
}

export interface TransactionDataToSubmit{
    [key:string]: string | number | undefined
    userId? : number
}

export interface ResetPasswordFormProps{
    token : string
}

export interface ChartData{
    [key:string]:string | number
}

export interface GroupedChartData{
    [key:string]: ChartData[]
}

export interface ChartProps{
    transactionsDetails: ChartData[],
    userId:number
}

export interface ChartFigureProps{
    [key:string]: ChartData[],
}

export interface ChartDetailsProps{
    data: GroupedChartData
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

export interface UpdatePasswordFormData{
    "password" : string
    "confirmPassword" : string
}

export interface SaveCategoryFormData{
    [key:string] : string
}
export interface TransactionDetails {
    //transaction_date : string,
    [key:string] : number | string
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
    currencies:DataObject[],
    userDefaultCurrency: number
    updateTransactionComponent: Function
}

export interface TransactionFilterProps{
    currencies: DataObject[],
    userDefaultCurrency: number
    updateTransactionSummaryComponent: Function
}

export interface TransactionComponentProps{
    loading: boolean,
    transactions:DateTransactionsMap,
    currencies: DataObject[],
    userDefaultCurrency: number
}

export interface GroupedTransactions{
    [key: string]: TransactionDetails[]
}

export interface ChartFilterProps{
    [x:string] : Function
}

export interface SettingsMenuProps{
    [key:string] : Function
}

export interface SettingsProps{
    currentUser: User
    categories: Categories[]
}

export interface User{
    user_id : number,
    [key:string] : string | number
}

export interface UserProps{
    [key:string] : User
}