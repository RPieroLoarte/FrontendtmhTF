import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Notification } from 'src/app/model/notification';
import { NotificationService } from 'src/app/service/notification.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-createdit-notification',
  templateUrl: './createdit-notification.component.html',
  styleUrls: ['./createdit-notification.component.css']
})
export class CreateditNotificationComponent {
  form: FormGroup = new FormGroup({});
  notification: Notification = new Notification();
  mensaje: string = '';
  listaUsers:User[]=[]
  idUserSeleccionada1:number=0
  view: { value: string; viewValue: string }[] = [
    { value: 'true', viewValue: 'true' },
    { value: 'false', viewValue: 'false' },
  ];
 
  constructor(
    private nS: NotificationService,
    private uS:UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idCategory: [''],
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      viewed: ['', [Validators.required]],
      user: ['', [Validators.required]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.notification.idNotification = this.form.value.idNotification;
      this.notification.title = this.form.value.title;
      this.notification.description = this.form.value.description;
      this.notification.date = this.form.value.date;
      this.notification.viewed = this.form.value.viewed;
      this.notification.user.idUser = this.form.value.user;
      
     
      this.nS.insert(this.notification).subscribe((data) => {
        this.nS.list().subscribe((data) => {
          this.nS.setList(data);
        });
      });
      this.router.navigate(['notification']);
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
