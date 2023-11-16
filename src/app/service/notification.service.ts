import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../model/notification';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = `${base_url}/notifications`;
  private listaCambio = new Subject<Notification[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Notification[]>(this.url);
  }
  insert(or: Notification) {
    return this.http.post(this.url, or);
  }
  listId(id:number){
    return this.http.get<Notification>(`${this.url}/${id}`);
  }
  setList(listaNueva: Notification[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
}
