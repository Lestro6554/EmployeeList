export enum Gender {
    Male = 'Мужской',
    Female = 'Женский'
}

export const checkGender = (male: boolean | undefined, female: boolean | undefined): string | undefined => {
    let gender: string | undefined

    if(male) {
        gender = Gender.Male
    }

    if(female) {
        gender = Gender.Female
    }
    
    return gender
}