import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Record } from 'src/app/model/record';
import { Product } from 'src/app/model/product';
import { Category } from 'src/app/model/category';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { RecordService } from 'src/app/service/record.service';

@Component({
  selector: 'app-createdit-record',
  templateUrl: './createdit-record.component.html',
  styleUrls: ['./createdit-record.component.css']
})
export class CreateditRecordComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  record: Record = new Record();
  mensaje: string = '';
  dueDateOrder = new FormControl(new Date());
  listaProduct:Product[]=[]
  listaCategory:Category[]=[]
  idProductSeleccionada:number=0
  idCategorySeleccionada:number=0
 
  constructor(
    private pS: ProductService,
    private cS: CategoryService,
    private rS: RecordService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idRecord: [''],
      payment: ['', Validators.required],
      paymentDate: ['', [Validators.required]],
      arriveDate: ['', Validators.required],
      points: ['', Validators.required],
      product: ['', Validators.required],  
    });
    this.pS.list().subscribe((data) => {
      this.listaProduct = data;
    });
    this.cS.list().subscribe((data) => {
      this.listaCategory = data;
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.record.idRecord = this.form.value.idRecord;
      this.record.payment = this.form.value.payment;
      this.record.paymentDate = this.form.value.paymentDate;
      this.record.arriveDate = this.form.value.arriveDate;
      this.record.points = this.form.value.points;
      this.record.product.idProduct = this.form.value.product;
     
      this.rS.insert(this.record).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['records']);
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
