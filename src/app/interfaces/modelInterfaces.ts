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


export interface IClient extends IEntity {
    name: string, 
    telephone: string, 
    birthDate: Date, 
    role: string,
    email: string, 
    username: string,	
    password: string,	
    verified: boolean, 
    token: string
}
export interface IToken {
    jti: string;
    iss: string;
    iat: number;
    exp: number;
    name: string;
}