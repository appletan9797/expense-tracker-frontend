import axios from 'axios'

class GetChartDataApiService{
    async getChartData(month = null, year = null){
        const url = process.env.NEXT_PUBLIC_DOMAIN+'transaction/chart-data/'
        const response = await axios.get(url)
        return response.data
    }
}

export const getChartDataApiService = new GetChartDataApiService()