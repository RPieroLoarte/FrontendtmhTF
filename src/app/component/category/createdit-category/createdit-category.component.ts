import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-createdit-category',
  templateUrl: './createdit-category.component.html',
  styleUrls: ['./createdit-category.component.css']
})
export class CreateditCategoryComponent {
  form: FormGroup = new FormGroup({});
  category: Category = new Category();
  mensaje: string = '';
 
  constructor(
    private cS: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idCategory: [''],
      nameCategory: ['', Validators.required],
      detailsCategory: ['', [Validators.required]],
    });
  }

  accept(): void {
    if (this.form.valid) {
      this.category.idCategory = this.form.value.idCategory;
      this.category.nameCategory = this.form.value.nameCategory;
      this.category.detailsCategory = this.form.value.detailsCategory;
     
      this.cS.insert(this.category).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['category']);
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
