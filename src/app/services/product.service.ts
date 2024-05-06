import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { IProduct, IProductPage } from '../interfaces/modelInterfaces';
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
      formData.append('name', oProduct.name);
      formData.append('description', oProduct.description);
      formData.append('price', oProduct.price.toString());
      formData.append('product_type.name', oProduct.product_type.name);
      return this.oHttpClient.post<IProduct>(this.sUrl + "/create", formData );

    } else {
      console.error('El parámetro "file" no es un objeto de tipo File');
      // Retornar un observable con un error o hacer lo que sea necesario
      return throwError('Error: El parámetro "file" no es un objeto de tipo File');
    }
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_product_type:number): Observable<IProductPage> {
    if (!size) size = 10;
    if (!page) page = 0;
    let strUrlProductType = "";
    if (id_product_type > 0) {
      strUrlProductType = "&product_type=" + id_product_type;
    }
    return this.oHttpClient.get<IProductPage>(this.sUrl + "/page?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection + strUrlProductType);
  }

  /** getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_user: number): Observable<IThreadPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        let strUrlUser = "";
        if (id_user > 0) {
            strUrlUser = "&user=" + id_user;
        }
        return this.oHttpClient.get<IThreadPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection + strUrlUser);
    }
 */

  
  getByProductType(id: number): Observable<IProduct[]> {
    return this.oHttpClient.get<IProduct[]>(this.sUrl + "/product-type/" + id);
  }
}
