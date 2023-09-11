import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { StudentsComponent } from './pages/students/students.component';
import {MatTableModule} from '@angular/material/table';
import { AddStudentDialogComponent } from './components/add-student-dialog/add-student-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { EditStudentDialogComponent } from './components/edit-student-dialog/edit-student-dialog.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import {MatSelectModule} from '@angular/material/select';
import { DeleteStudentDialogComponent } from './components/delete-student-dialog/delete-student-dialog.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { StudentInfoPanelComponent } from './components/student-info-panel/student-info-panel.component';
import { RecordsPanelComponent } from './components/records-panel/records-panel.component';
import { EditGradeDialogComponent } from './components/edit-grade-dialog/edit-grade-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthGuardService } from './shared/auth-guard.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { SearchStudentComponent } from './components/search-student/search-student.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    StudentsComponent,
    AddStudentDialogComponent,
    StudentsTableComponent,
    EditStudentDialogComponent,
    DeleteStudentDialogComponent,
    StudentProfileComponent,
    StudentInfoPanelComponent,
    RecordsPanelComponent,
    EditGradeDialogComponent,
    SearchStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
  ],
  providers: [provideNgxMask(), AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
