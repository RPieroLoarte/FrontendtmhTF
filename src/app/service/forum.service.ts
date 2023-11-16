import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Forum } from '../model/forum';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})

export class ForumService {
  private url = `${base_url}/Forum`;
  private listaCambio = new Subject<Forum[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Forum[]>(this.url);
  }
  insert(fs: Forum) {
    return this.http.post(this.url, fs);
  }
  setList(listaNueva: Forum[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Forum>(`${this.url}/${id}`);
  }  
  update(f: Forum) {
    return this.http.put(this.url, f);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
