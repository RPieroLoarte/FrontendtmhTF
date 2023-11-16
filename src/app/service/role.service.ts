import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Role } from '../model/role';


const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})

export class RoleService {
  private url = `${base_url}/Role`;
  private listaCambio = new Subject<Role[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Role[]>(this.url);
  }
  insert(rs: Role) {
    return this.http.post(this.url, rs);
  }
  setList(listaNueva: Role[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Role>(`${this.url}/${id}`);
  }  
  update(r: Role) {
    return this.http.put(this.url, r);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
