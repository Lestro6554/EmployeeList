import './itemEmployee.css';
import IEmp from "../../models/IEmployee";
import employee from '../../store/Employee';
import { observer } from 'mobx-react';
function ItemEmployee() {

    const handleClick = (e: any): void => {
        employee.toggleActive(+e.target.dataset.index)
    }

    

    return (
        <tbody>
            {employee.emps.map((emp: IEmp) => (
                <tr className={(emp.isActive) ? 'item__active' : ''} onClick={handleClick} key={emp.id} id={emp.id+''}>
                    <th data-index={emp.id}>{emp.fio}</th>
                    <th data-index={emp.id}>{emp.position}</th>
                    <th data-index={emp.id}>{emp.birthdate ? emp.birthdate.toLocaleDateString() : ''}</th>
                    <th data-index={emp.id}>{emp.gender}</th>
                    <th data-index={emp.id}>
                        <input type="checkbox" checked={emp.isDismissed} readOnly/>
                    </th>
                </tr>
            ))}
        </tbody>
    )
}

const ItemEmployeeObserver = observer(ItemEmployee)
export default ItemEmployeeObserver