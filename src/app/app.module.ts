import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { TolistUserComponent } from './component/user/tolist-user/tolist-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatTableModule} from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import{MatNativeDateModule} from '@angular/material/core'
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatMenuModule } from '@angular/material/menu';
import{MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { CreateditUserComponent } from './component/user/createdit-user/createdit-user.component';
import { ProductComponent } from './component/product/product.component';
import { TolistProductComponent } from './component/product/tolist-product/tolist-product.component';
import { CreateditProductComponent } from './component/product/createdit-product/createdit-product.component';
import { OrderComponent } from './component/order/order.component';
import { TolistOrderComponent } from './component/order/tolist-order/tolist-order.component';
import { CreateditOrderComponent } from './component/order/createdit-order/createdit-order.component';
import { MessageComponent } from './component/message/message.component';
import { TolistMessageComponent } from './component/message/tolist-message/tolist-message.component';
import { CreateditMessageComponent } from './component/message/createdit-message/createdit-message.component';
import { ReportUserComponent } from './component/user/report-user/report-user.component';
import { NotificationComponent } from './component/notification/notification.component';
import { CreateditNotificationComponent } from './component/notification/createdit-notification/createdit-notification.component';
import { TolistNotificationComponent } from './component/notification/tolist-notification/tolist-notification.component';
import { CategoryComponent } from './component/category/category.component';
import { CreateditCategoryComponent } from './component/category/createdit-category/createdit-category.component';
import { TolistCategoryComponent } from './component/category/tolist-category/tolist-category.component';
import { RoleComponent } from './component/role/role.component';
import { TolistRoleComponent } from './component/role/tolist-role/tolist-role.component';
import { CreateditRoleComponent } from './component/role/createdit-role/createdit-role.component';
import { ForumComponent } from './component/forum/forum.component';
import { CreateditForumComponent } from './component/forum/createdit-forum/createdit-forum.component';
import { TolistForumComponent } from './component/forum/tolist-forum/tolist-forum.component';
import { RecordComponent } from './component/record/record.component';
import { TolistRecordComponent } from './component/record/tolist-record/tolist-record.component';
import { CreateditRecordComponent } from './component/record/createdit-record/createdit-record.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TolistUserComponent,
    CreateditUserComponent,
    ProductComponent,
    TolistProductComponent,
    CreateditProductComponent,
    OrderComponent,
    TolistOrderComponent,
    CreateditOrderComponent,
    MessageComponent,
    TolistMessageComponent,
    CreateditMessageComponent,
    ReportUserComponent,
    NotificationComponent,
    CreateditNotificationComponent,
    TolistNotificationComponent,
    CategoryComponent,
    CreateditCategoryComponent,
    TolistCategoryComponent,
    RoleComponent,
    TolistRoleComponent,
    CreateditRoleComponent,
    ForumComponent,
    CreateditForumComponent,
    TolistForumComponent,
    RecordComponent,
    TolistRecordComponent,
    CreateditRecordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule, 
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
