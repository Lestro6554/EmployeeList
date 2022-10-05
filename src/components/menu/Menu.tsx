import { useState } from 'react';
import AddFormObserver from '../addEmployee/AddForm';
import Modal from '../modal/Modal';
import { observer } from 'mobx-react'
import employee from '../../store/Employee';
import './menu.css';

function Menu({ isDirty, setIsDirty }: any) {

    const active = employee.getIsActive;
    const [modalActiveAdd, setModalActiveAdd] = useState<boolean>(false)
    const [modalActiveUpdate, setModalActiveUpdate] = useState<boolean>(false)

    const deleteActive = (): void => {
        if (active) {
            employee.deleteEmp(active);
            setIsDirty(true)
        }
    }

    const updateData = (): void => {
        if(isDirty) {
            setModalActiveUpdate(true)
        } else {
            employee.getData()
        }
    }

    const saveData = (): void => {
        employee.saveData()
        setIsDirty(false)
    }

    return (
        <div className="menu">
            <button disabled={isDirty ? false : true} onClick={saveData}>Сохранить</button>
            <button onClick={updateData}>Обновить</button>
            <button disabled={active ? false : true} onClick={deleteActive}>Удалить</button>
            <button onClick={() => setModalActiveAdd(true)}>Добавить</button>
            <Modal active={modalActiveAdd} setActive={setModalActiveAdd}>
                <AddFormObserver setActive={setModalActiveAdd} isDirty={isDirty} setIsDirty={setIsDirty} />
            </Modal>

            <Modal active={modalActiveUpdate} setActive={setModalActiveUpdate}>
                <h1>Все внесенные изменения будут потеряны</h1>
                <button className='btn__center' onClick={() => {employee.getData(); setModalActiveUpdate(false)}}>Продолжить</button>
                <button className='btn__center' onClick={() => setModalActiveUpdate(false)}>Отмена</button>
            </Modal>

        </div>
    )
}

const MenuObserver = observer(Menu)
export default MenuObserver