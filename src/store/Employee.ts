import { makeAutoObservable } from "mobx"
import data from "../data/Data";
import IEmp from "../models/IEmployee"

class Employee {
    emps: IEmp[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getData() {
        const allEmp = data.getAllData()
        if(allEmp) {
            this.emps = allEmp.map((elem) => {
                return {
                    ...elem,
                    birthdate: elem.birthdate ? new Date(elem.birthdate) : undefined
                }
            })
        }
    }

    saveData() {
        data.saveData(this.emps)
    }

    toggleActive(id: number) {
        this.emps.filter((elem) => elem.id !== id).forEach((elem) => elem.isActive = false)
        const active = this.emps.find((elem) => elem.id === id)
        if (active) {
            active.isActive = !active.isActive
        }
    }

    parseDate(date: Date | undefined) {
        if (date) {
            const newDate = date.toISOString().slice(0, 10)
            return newDate
        }
    }

    pushEmp(emp: IEmp) {
        let isActive = this.getIsActive
        if (isActive) {
            isActive.isActive = false
        }

        this.emps.push(emp)
    }

    editEmp(editEmp: IEmp) {
        let emp = this.getIsActive
        if (emp) {
            emp.id = editEmp.id;
            emp.fio = editEmp.fio;
            emp.position = editEmp.position;
            emp.birthdate = editEmp.birthdate;
            emp.gender = editEmp.gender;
            emp.isDismissed = editEmp.isDismissed;
        }
    }

    deleteEmp(delEmp: IEmp) {
        const index = this.emps.indexOf(delEmp)
        if (index > -1) {
            this.emps.splice(index, 1);
        }

    }

    get lastId() {
        const emp = this.emps 
        if(emp.length) {
            return emp[emp.length - 1].id + 1
        } else {
            return 1
        }
    }

    get getIsActive() {
        const active = this.emps.find((elem) => elem.isActive === true)
        return active
    }
}

const employee = new Employee();
export default employee