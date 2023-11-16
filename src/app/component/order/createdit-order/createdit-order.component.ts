import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-createdit-order',
  templateUrl: './createdit-order.component.html',
  styleUrls: ['./createdit-order.component.css']
})
export class CreateditOrderComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  order: Order = new Order();
  mensaje: string = '';
  dueDateOrder = new FormControl(new Date());
  listaUsers:User[]=[]
  idUserSeleccionada1:number=0
  idUserSeleccionada2:number=0
 
  constructor(
    private oS: OrderService,
    private uS: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idOrder: [''],
      shippingDate: ['', Validators.required],
      arriveDate: ['', [Validators.required]],
      destinationCountry: ['', Validators.required],
      destinationCity: ['', Validators.required],
      destinationAddress: ['', Validators.required],  
      originCountry: ['', Validators.required],  
      originCity: ['', Validators.required],    
      user: ['', [Validators.required]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.order.idOrder = this.form.value.idOrder;
      this.order.shippingDate = this.form.value.shippingDate;
      this.order.arriveDate = this.form.value.arriveDate;
      this.order.destinationCountry = this.form.value.destinationCountry;
      this.order.destinationCity = this.form.value.destinationCity;
      this.order.destinationAddress = this.form.value.destinationAddress;
      this.order.originCountry = this.form.value.originCountry;
      this.order.originCity = this.form.value.originCity;
      this.order.user.idUser = this.form.value.user;
     
      this.oS.insert(this.order).subscribe((data) => {
        this.oS.list().subscribe((data) => {
          this.oS.setList(data);
        });
      });
      this.router.navigate(['order']);
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
