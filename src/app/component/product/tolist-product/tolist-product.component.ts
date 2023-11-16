import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-tolist-product',
  templateUrl: './tolist-product.component.html',
  styleUrls: ['./tolist-product.component.css'],
})
export class TolistProductComponent implements OnInit {
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idProduct',
    'nameProduct',
    'descriptionProduct',
    'priceProduct',
    'dimensionsProduct',
    'order',
    'category',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: ProductService) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
