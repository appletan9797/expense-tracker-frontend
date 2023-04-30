import { DataObject } from "../types/TransactionInterfaceType";
import Cookies from "universal-cookie"
import { getCurrencyApiService } from "../modules/currency/services/GetCurrencyApiService"
import { getDefaultCurrencyApiService } from "../modules/user/services/GetDefaultCurrencyApiService"

class SaveDataUponLogin{
    setLoginCookies(user: DataObject){
        const cookies = new Cookies()
        cookies.set("expense_tracker_login", user.token, { path: "/", maxAge:2147483647 })
    }

    async setLocalStorage(user: DataObject){
        const currencies = await getCurrencyApiService.getAllCurrency()
        const userDefaultCurrency = await getDefaultCurrencyApiService.getDefaultCurrency(Number(user.userid))
        localStorage.setItem("currencies", JSON.stringify(currencies))
        localStorage.setItem("userDefaultCurrency", userDefaultCurrency ? userDefaultCurrency : 0)
    }
}

export const saveDataUponLogin = new SaveDataUponLogin()