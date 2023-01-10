import { AuthGuard } from './user/auth.guard';
import { ModifyTaskComponent } from './user/modify-task/modify-task.component';
import { AddTaskComponent } from './user/add-task/add-task.component';
import { DetailsComponent } from './user/details/details.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './user/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';

export const routes: Routes = [
  {path:"home",component : HomeComponent,canActivate:[AuthGuard]},
  {path:"details/:id",component:DetailsComponent,canActivate:[AuthGuard]},
  {path: "signup",component:UserComponent,children:[{path:'',component:SignUpComponent}]},
  {path: "login",component:UserComponent,children:[{path:'',component:SignInComponent}]},
  {path:'modify/:id1',component:ModifyTaskComponent,canActivate:[AuthGuard]},
  {path:"addTask",component:AddTaskComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'test1',component:Test1Component},
  {path:'test2',component:Test2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
