import {IFormValues} from "../types/contactForm";
import {randomNumber} from "./random";
import {IContact} from "../models/contact";

export const transformToContact = ({first, gender, last, email}: IFormValues, picture?: string): IContact => {
    return {
        name: {
            first,
            last
        },
        email,
        gender,
        picture: picture ?? `https://randomuser.me/api/portraits/${gender === 'male' ? 'men' : 'women'}/${randomNumber(1, 99)}.jpg`,
    }
}