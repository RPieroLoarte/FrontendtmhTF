import { environment } from './../../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Record } from '../model/record';


const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})

export class RecordService {

  private url = `${base_url}/records`;
  private listaCambio = new Subject<Record[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Record[]>(this.url);
  }
  insert(r: Record) {
    return this.http.post(this.url, r);
  }
  setList(listaNueva: Record[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Record>(`${this.url}/${id}`);
  } 
  update(r: Record) {
    return this.http.put(this.url, r);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
