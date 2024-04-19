import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { IProduct } from '../interfaces/modelInterfaces';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  sUrl: string = API_URL + "/product";


  constructor(
    private oHttpClient: HttpClient

  ) { }

  getByClient(idProductType: number): Observable<IProduct[]> {
    return this.oHttpClient.get<IProduct[]>(this.sUrl + "/product-type/" + idProductType);
  }

  create(oProduct: IProduct, file : File): Observable<IProduct> {
   

    const formData = new FormData();
  

    if (file instanceof File) {
      const formData = new FormData();
      formData.append('file', file, file.name); // Aquí agregamos el archivo con su nombre
      formData.append('oProduct', JSON.stringify(oProduct));
      return this.oHttpClient.post<IProduct>(this.sUrl + "/create", formData );

    } else {
      // Manejar el caso en que 'file' no sea un objeto de tipo 'File'
      console.error('El parámetro "file" no es un objeto de tipo File');
      // Retornar un observable con un error o hacer lo que sea necesario
      return throwError('Error: El parámetro "file" no es un objeto de tipo File');
    }
  }
}
