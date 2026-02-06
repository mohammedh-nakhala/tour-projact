import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path:'users',loadChildren:()=>import('./features/users/user.routes.module').then((m)=>m.usermodule)
  },
  {
    path:'admin',loadChildren:()=>import('./features/admin/admin.routes.module').then((m)=>m.AdminModul)
  },
  {path:'' ,redirectTo :'users', pathMatch: "full"}
];
