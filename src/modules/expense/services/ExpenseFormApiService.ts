import axios from 'axios';

class ExpenseFormApiService{
    async getFormFieldsData(){
        const url = 'http://localhost/api/get-form-fields';
        const getFieldsData = await axios.get(url);
        const fieldsData = getFieldsData.data;
        return fieldsData;
    }
}

export const expenseFormApiService = new ExpenseFormApiService();
