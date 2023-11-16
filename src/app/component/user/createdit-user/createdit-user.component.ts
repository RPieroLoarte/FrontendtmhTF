import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-createdit-user',
  templateUrl: './createdit-user.component.html',
  styleUrls: ['./createdit-user.component.css']
})

export class CreateditUserComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: User = new User();
  mensaje: string = '';
  id: number = 0;
  maxFecha: Date = moment().add(-1, 'days').toDate();
  dueDateUser = new FormControl(new Date());
  edition: boolean = false;
 
  constructor(
    private uS: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edition = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idUser: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      country: ['', Validators.required],    
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.user.idUser = this.form.value.idUser;
      this.user.name = this.form.value.name;
      this.user.email = this.form.value.email;
      this.user.phone = this.form.value.phone;
      this.user.birthday = this.form.value.birthday;
      this.user.country = this.form.value.country;
     
      this.uS.insert(this.user).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['user']);
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

  init() {
    if (this.edition) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUser: new FormControl(data.idUser),
          name: new FormControl(data.name),
          email: new FormControl(data.email),
          phone: new FormControl(data.phone),
          birthday: new FormControl(data.birthday),
          country: new FormControl(data.country),          
        });
      });
    }
  }  

}
