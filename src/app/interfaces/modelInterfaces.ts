import { Time } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";


export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IPage<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;

    strSortField: string;
    strSortDirection: string;
    strFilter: string;
    strFilteredTitle: string;
    strFilteredMessage: string;
    nRecords: number;
}

export interface IEntity {
    id: number,
}

export interface IClientPage extends IPage<IClient> {
}

export interface IBookingPage extends IPage<IBooking> {
}

export interface IEmployeePage extends IPage<IEmployee> {
}


export interface IClient extends IEntity {
    username: string,
    name: string,
    telephone: string,
    birthDate: Date,
    role: string,
    email: string,
    password: string,
    verified: boolean,
    token: string,
    bookings: number,
}

export interface IEmployee extends IEntity {
    name: string,
    dni: string,
    telephone: string,
    birthDate: Date,
    role: string,
    username: string,
    password: string,

}

export interface ITable extends IEntity {
    id: number,
    site: string,
    capacity: number,
    available: boolean,
}

export interface ITime extends IEntity {
    hour: string
}

export interface IBooking extends IEntity {
    date: Date,
    client: IClient,
    time_zone: ITime
    table: ITable,
    employee: IEmployee,

}

export interface IProduct extends IEntity {
    name: string,
    description: string,
    price: number,
    image: string,
    product_type: IProductType,
}

export interface IProductPage extends IPage<IProduct> {
}

export interface IProductTypePage extends IPage<IProductType> {
}

export interface IOrder extends IEntity {  
    employee: IEmployee,
    booking: IBooking,
    product: IProduct,
}

export interface IProductType extends IEntity {
    name: string,
    product: IProduct,
}







export interface IToken {
    jti: string;
    iss: string;
    iat: number;
    exp: number;
    name: string;
}

export type formOperation = 'EDIT' | 'NEW';

export interface SessionEvent {
    type: string;
}
