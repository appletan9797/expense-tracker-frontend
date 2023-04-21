import axios from 'axios'

class GetChartDataApiService{
    async getChartData(month = 0, year = 0){
        let url = process.env.NEXT_PUBLIC_DOMAIN+'transaction/chart-data/'
        if(month !== 0) {
            url += month+"/"
        }
        if(year !== 0) {
            url += year
        }
        const response = await axios.get(url)
        return response.data
    }
}

export const getChartDataApiService = new GetChartDataApiService()