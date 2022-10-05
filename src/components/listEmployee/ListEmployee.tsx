import './listEmployee.css';
import ItemEmployeeObserver from '../itemEmploymee/ItemEmployee';

export default function ListEmployee() {

    return (
        <div className="listEmployee">
            <h1>Список Сотрудников</h1>
            <table>
                <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Должность</th>
                            <th>Дата рождения</th>
                            <th>Пол</th>
                            <th>Уволен</th>
                        </tr>
                </thead>
                <ItemEmployeeObserver />
            </table>
        </div>
    )
}