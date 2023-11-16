import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '../model/message';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private url = `${base_url}/Message`;
  private listaCambio = new Subject<Message[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Message[]>(this.url);
  }
  insert(ms: Message) {
    return this.http.post(this.url, ms);
  }
  setList(listaNueva: Message[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Message>(`${this.url}/${id}`);
  }  
  update(m: Message) {
    return this.http.put(this.url, m);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
