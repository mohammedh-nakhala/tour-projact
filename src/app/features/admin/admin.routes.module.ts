import { Component, NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ToursCreateComponent } from "./components/tours/tours-create/tours-create.component";
import { ToursListComponent } from "./components/tours/tours-list/tours-list.component";
import { ToursUpdateComponent } from "./components/tours/tours-update/tours-update.component";
import { DestinationsCreateComponent } from "./components/destinations/destinations-create/destinations-create.component";
import { DestinationsListComponent } from "./components/destinations/destinations-list/destinations-list.component";
import { DestinationsUpdateComponent } from "./components/destinations/destinations-update/destinations-update.component";
import { AdminCreateComponent } from "./components/admin/admin-create/admin-create.component";
import { AdminListComponent } from "./components/admin/admin-list/admin-list.component";
import { AdminUpdateComponent } from "./components/admin/admin-update/admin-update.component";
import { AdminLoginComponent } from "./components/admin/admin-login/admin-login.component";
import { AuthGuard } from "../../core/guards/auth.guard";

let route : Routes =[
  {path:'login',component:AdminLoginComponent},
  {path:'',component:AdminLayoutComponent, canActivate: [AuthGuard], children:[
    {path:'home',component:AdminHomeComponent},
    {path:'tc',component:ToursCreateComponent},
    {path:'tl',component:ToursListComponent},
    {path:'tu/:id',component:ToursUpdateComponent},
    {path:'dc',component:DestinationsCreateComponent},
    {path:'dl',component:DestinationsListComponent},
    {path:'du/:id',component:DestinationsUpdateComponent},
     {path:'ac',component:AdminCreateComponent},
    {path:'al',component:AdminListComponent},
    {path:'au/:id',component:AdminUpdateComponent},
    {path:'',component:AdminHomeComponent}

  ]}
]

@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})

export class AdminModul{

}
