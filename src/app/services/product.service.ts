import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product-model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = environment.baseUrl + 'product';

  getProducts(): Observable<Array<ProductModel>>{
    return this.http.get<Array<ProductModel>>(this.baseUrl);
  }

  deleteProduct(productId: number): Observable<{}>{
    const url = `${this.baseUrl}/${productId}`
    return this.http.delete(url)
  }

  addProduct(request: ProductModel): Observable<ProductModel>{
    return this.http.post<ProductModel>(this.baseUrl, request);
  }

  getProductById(productId: number): Observable<ProductModel>{
    const url = `${this.baseUrl}/${productId}`
    return this.http.get<ProductModel>(url);
  }

  updateProduct(productId: number, request: ProductModel): Observable<ProductModel>{
    request.productId = productId;
    
    const url = `${this.baseUrl}/${request.productId}`
    return this.http.put<ProductModel>(url, request);
  }
}
