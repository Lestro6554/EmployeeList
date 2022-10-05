import { useEffect, useState } from 'react';
import employee from '../../store/Employee';
import EditEmployeeObserver from '../editEmployee/EditEmployee';
import ListEmployee from '../listEmployee/ListEmployee';
import MenuObserver from '../menu/Menu';
import './employee.css';

export default function Employee() {

    const [isDirty, setIsDirty] = useState<boolean>(false);

    return (
        <div className="container">
            <MenuObserver isDirty={isDirty} setIsDirty={setIsDirty} />
            <ListEmployee />
            <EditEmployeeObserver isDirty={isDirty} setIsDirty={setIsDirty} />
        </div>
    )
}