import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = `${base_url}/Categories`;
  private listaCambio = new Subject<Category[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Category[]>(this.url);
  }
  insert(or: Category) {
    return this.http.post(this.url, or);
  }
  listId(id:number){
    return this.http.get<Category>(`${this.url}/${id}`);
  }
  setList(listaNueva: Category[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
}
