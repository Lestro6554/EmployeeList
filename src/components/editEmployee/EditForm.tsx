import './editEmployee.css';
import IEmp from "../../models/IEmployee"
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react';
import { checkGender, Gender } from '../../models/helpers';
import employee from '../../store/Employee';

function EditForm({emp, isDirty, setIsDirty}: any) {
    
    const [fio, setFio] = useState<string>(emp.fio);
    const [pos, setPos] = useState<string>(emp.position);
    const [birthdate, setBirthdate] = useState<string | undefined>(employee.parseDate(emp.birthdate) || '');
    const [isMale, setIsMale] = useState<boolean | undefined>(emp.gender === Gender.Male);
    const [isFemale, setIsFemale] = useState<boolean | undefined>(emp.gender === Gender.Female);
    const [isDismissed, setIsDismissed] = useState<boolean | undefined>(emp.isDismissed || false);

    useEffect((): void => {
        setFio(emp.fio)
        setPos(emp.position)
        setBirthdate(employee.parseDate(emp.birthdate) || '')
        setIsMale(emp.gender === Gender.Male)
        setIsFemale(emp.gender === Gender.Female)
        setIsDismissed(emp.isDismissed || false)
    }, [emp])

    const hundleChangeFio = (e: any): void => {
        const reg: RegExp = /^[a-zA-Zа-яА-Я ]*$/
        if (reg.test(e.target.value)) {
            setFio(e.target.value)
        }
    }

    const hundleChangePos = (e: any): void => {
        setPos(e.target.value)
    }

    const hundleChangeBirthdate = (e: any): void => {
        setBirthdate(e.target.value)
    }

    const hundleChangeGender = (e: any): void => {
        if (e.target.id === 'male') {
            setIsFemale(!e.target.checked)
            setIsMale(e.target.checked)
        }

        if (e.target.id === 'female') {
            setIsMale(!e.target.checked)
            setIsFemale(e.target.checked)
        }
    }

    const hundleChangeDismissed = (e: any): void => {
        setIsDismissed(e.target.checked)
    }

    const handleSubmit = (e: any): void => {
        e.preventDefault()
        let bd: Date | undefined

        if (birthdate) {
            bd = new Date(birthdate)
        } else {
            bd = undefined
        }

        const editEmp: IEmp = {
            id: emp.id,
            fio: fio,
            position: pos,
            birthdate: bd,
            gender: checkGender(isMale, isFemale),
            isDismissed: isDismissed
        }
        
        employee.editEmp(editEmp)
        setIsDirty(true)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                ФИО
                <br />
                <input type="text" required value={fio} id='fio' name='fio' onChange={hundleChangeFio} />
            </label>
            <br />
            <label>
                Должность
                <br />
                <select id='position' required value={pos} onChange={hundleChangePos}>
                    <option value="Директор">Директор</option>
                    <option value="Менеджер">Менеджер</option>
                    <option value="Аналитик">Аналитик</option>
                    <option value="Разработчик">Разработчик</option>
                </select>
            </label>
            <br />
            <label>
                Дата рождения
                <br />
                <input type="date" value={birthdate} id='birthdate' name='birthdate' onChange={hundleChangeBirthdate} />
            </label>
            <br />
            <label>
                Пол
                <br />
                <input type="radio" id='male' name='gender' checked={isMale} onChange={hundleChangeGender} />
                <label htmlFor="male">Мужской</label>
                <input type="radio" id='female' name='gender' checked={isFemale} onChange={hundleChangeGender} />
                <label htmlFor="female">Женский</label>
            </label>
            <br />
            <label>
                Уволен
                <input type="checkbox" id='isDismissed' name='isDismissed' checked={isDismissed} onChange={hundleChangeDismissed} />
            </label>
            <br />
            <input type="submit" value="Редактировать" />
        </form>
    )
}

const EditFormObserver = observer(EditForm)
export default EditFormObserver