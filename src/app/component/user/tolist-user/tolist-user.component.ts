import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-tolist-user',
  templateUrl: './tolist-user.component.html',
  styleUrls: ['./tolist-user.component.css'],
})
export class TolistUserComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idUser',
    'name',
    'email',
    'phone',
    'birthday',
    'country',
    'actualizar',
    'eliminar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UserService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
