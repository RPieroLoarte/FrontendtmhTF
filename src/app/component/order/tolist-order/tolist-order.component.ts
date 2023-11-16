import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-tolist-order',
  templateUrl: './tolist-order.component.html',
  styleUrls: ['./tolist-order.component.css'],
})
export class TolistOrderComponent implements OnInit {
  dataSource: MatTableDataSource<Order> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idOrder',
    'shippingDate',
    'arriveDate',
    'destinationCountry',
    'destinationCity',
    'destinationAddress',
    'originCountry',
    'originCity',
    'user'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private oS: OrderService) {}

  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.oS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
