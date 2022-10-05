export default interface IEmployee {
    id: number,
    fio: string,
    position: string,
    birthdate?: Date | null,
    gender?: string | null,
    isDismissed?: boolean,
    isActive?: boolean 
};
