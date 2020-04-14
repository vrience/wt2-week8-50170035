import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'https://crudcrud.com/api/237b1fddc8d84c068cec8a03c005d02c'; // berbeda untuk setiap mahasiswa

  constructor(private http: HttpClient) {}

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/item/${id}`);
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/item`);
  }

  postItem(param: Item): Observable<any> {
    return this.http.post(`${this.baseUrl}/item`, param);
  }

  updateItem(id: string, param: Item): Observable<any> {
    return this.http.put(`${this.baseUrl}/item/${id}`, param);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/item/${id}`);
  }
}
