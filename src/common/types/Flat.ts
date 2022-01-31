import {Facility} from "./Facility";

export interface Flat {
    id?: number,
    name: string,
    address: FlatAddress,
    rooms?: number,
    area?: number,
    numberOfGuests?: number,
    active: boolean,
    facilities: Facility[],
    images: Image[],
    description: string
}

export interface FlatAddress {
    id?: number,
    streetName: string,
    houseNumber: string,
    localNumber?: string
    postalCode: string,
    city: string
}

export interface Image {
    id?: number,
    path?: string
}

export const EmptyFlatAddress: FlatAddress = {
    streetName: '',
    houseNumber: '',
    localNumber: undefined,
    postalCode: '',
    city: ''
}

export const EmptyFlat: Flat = {
    name: '',
    address: EmptyFlatAddress,
    rooms: undefined,
    area: undefined,
    numberOfGuests: undefined,
    active: true,
    facilities: [],
    images: [],
    description: ''
}

