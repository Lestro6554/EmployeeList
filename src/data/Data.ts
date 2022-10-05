import test from './testEmp.json'
import IEmp from "../models/IEmployee"

class Data {
    loadTest() {
        localStorage.setItem('emps', JSON.stringify(test.emps))
    }

    getAllData() {
        let dataEmps = localStorage.getItem('emps');
        if(dataEmps) {
            let newDate: IEmp[] = JSON.parse(dataEmps)
            return newDate;
        }
    }

    saveData(emps: IEmp[]) {
        localStorage.setItem('emps', JSON.stringify(emps))
    }
}

const data = new Data();
export default data