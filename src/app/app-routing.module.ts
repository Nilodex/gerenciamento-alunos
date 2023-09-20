import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { StudentsComponent } from './pages/students/students.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {path:'home', component: DashboardComponent, canActivate:[AuthGuardService]},
  {path:'login', component: LoginComponent},
  {path:'alunos', component: StudentsComponent, canActivate:[AuthGuardService]},
  {path:'alunos/profile/:id', component: StudentProfileComponent, canActivate:[AuthGuardService]},
  {path:'', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
