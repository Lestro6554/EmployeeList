import IEmp from "../../models/IEmployee"
import { observer } from 'mobx-react'
import { useState } from 'react';
import { checkGender } from '../../models/helpers';
import employee from '../../store/Employee';

function AddForm({ setActive, isDirty, setIsDirty }: any) {

    const [fio, setFio] = useState<string>('');
    const [pos, setPos] = useState<string>('Аналитик');
    const [birthdate, setBirthdate] = useState<string | undefined>('');
    const [isMale, setIsMale] = useState<boolean | undefined>(false);
    const [isFemale, setIsFemale] = useState<boolean | undefined>(false);
    const [isDismissed, setIsDismissed] = useState<boolean | undefined>(false);

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

    const hundleChangeMale = (e: any): void => {
        setIsFemale(!e.target.checked)
        setIsMale(e.target.checked)
    }

    const hundleChangeFemale = (e: any): void => {
        setIsMale(!e.target.checked)
        setIsFemale(e.target.checked)
    }

    const hundleChangeDismissed = (e: any): void => {
        setIsDismissed(e.target.checked)
    }

    const resetForm = (): void => {
        setActive(false)
        setFio('')
        setPos('Аналитик')
        setBirthdate('')
        setIsFemale(false)
        setIsMale(false)
        setIsDismissed(false)
        setIsDirty(true)
    }

    const handleSubmit = (e: any): void => {
        e.preventDefault()
        let bd: Date | undefined

        if (birthdate) {
            bd = new Date(birthdate)
        } else {
            bd = undefined
        }

        const addEmp: IEmp = {
            id: employee.lastId,
            fio: fio,
            position: pos,
            birthdate: bd,
            gender: checkGender(isMale, isFemale),
            isDismissed: isDismissed,
            isActive: true
        }

        employee.pushEmp(addEmp)
        resetForm()
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
                <input type="radio" id='male' name='gender' checked={isMale} onChange={hundleChangeMale} />
                <label htmlFor="male">Мужской</label>
                <input type="radio" id='female' name='gender' checked={isFemale} onChange={hundleChangeFemale} />
                <label htmlFor="female">Женский</label>
            </label>
            <br />
            <label>
                Уволен
                <input type="checkbox" id='isDismissed' name='isDismissed' checked={isDismissed} onChange={hundleChangeDismissed} />
            </label>
            <br />
            <input type="submit" value="Добавить" />
        </form>
    )
}

const AddFormObserver = observer(AddForm)
export default AddFormObserver