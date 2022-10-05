import './editEmployee.css';
import IEmp from "../../models/IEmployee"
import employee from '../../store/Employee';
import { observer } from 'mobx-react'
import EditFormObserver from './EditForm';

function EditEmployee({isDirty, setIsDirty}: any) {

    const emp: IEmp | undefined = employee.getIsActive;

    return (
        <div className="editEmployee">
            <h1>Редактирование Сотрудника</h1>
            {(emp) ? 
                <EditFormObserver emp={emp} isDirty={isDirty} setIsDirty={setIsDirty}/>
                :
                <h3>Выберите сотрудника</h3>
            }
        </div>
    )
}

const EditEmployeeObserver = observer(EditEmployee)
export default EditEmployeeObserver