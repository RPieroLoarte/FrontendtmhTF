import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/model/order';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-createdit-product',
  templateUrl: './createdit-product.component.html',
  styleUrls: ['./createdit-product.component.css']
})
export class CreateditProductComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  product: Product = new Product();
  mensaje: string = '';
  listaOrder:Order[]=[]
  listaCategory:Category[]=[]
  idOrderSeleccionada:number=0
  idCategorySeleccionada:number=0
  
 
  constructor(
    private pS: ProductService,
    private cS: CategoryService,
    private oS: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idProduct: [''],
      nameProduct: ['', Validators.required],
      descriptionProduct: ['', [Validators.required]],
      priceProduct: ['', Validators.required],
      dimensionsProduct: ['', Validators.required],
      order: ['', Validators.required],
      category: ['', Validators.required],
    });
    this.oS.list().subscribe((data) => {
      this.listaOrder = data;
    });
    this.cS.list().subscribe((data) => {
      this.listaCategory = data;
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.product.idProduct = this.form.value.idProduct;
      this.product.nameProduct = this.form.value.nameProduct;
      this.product.descriptionProduct = this.form.value.descriptionProduct;
      this.product.priceProduct = this.form.value.priceProduct;
      this.product.dimensionsProduct = this.form.value.dimensionsProduct;
      this.product.order.idOrder = this.form.value.order;
      this.product.category.idCategory = this.form.value.category;

      this.pS.insert(this.product).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
      });
      this.router.navigate(['product']);
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
