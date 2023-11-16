import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Forum } from 'src/app/model/forum';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { ForumService } from 'src/app/service/forum.service';

@Component({
  selector: 'app-createdit-forum',
  templateUrl: './createdit-forum.component.html',
  styleUrls: ['./createdit-forum.component.css']
})
export class CreateditForumComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  forum: Forum = new Forum();
  mensaje: string = '';
  dueDateOrder = new FormControl(new Date());
  listaUsers:User[]=[]
  idUserSeleccionada:number=0
 
  constructor(
    private fS: ForumService,
    private uS: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idForum: [''],
      forum: ['', Validators.required],
      date: ['', [Validators.required]],
      user: ['', [Validators.required]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.forum.idForum = this.form.value.idForum;
      this.forum.forum = this.form.value.forum;
      this.forum.date = this.form.value.date;
      this.forum.user.idUser = this.form.value.user;
     
      this.fS.insert(this.forum).subscribe((data) => {
        this.fS.list().subscribe((data) => {
          this.fS.setList(data);
        });
      });
      this.router.navigate(['Forum']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
