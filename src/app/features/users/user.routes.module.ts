import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { UserLayoutComponent } from "./layout/user-layout/user-layout.component";


const route :Routes =[

{path:'',component:UserLayoutComponent,children:[


{path:'home' , component: HomeComponent },
{path:'about' , loadComponent:()=> import('./components/about/about.component').then((c)=>c.AboutComponent)},
{path:'blog' , loadComponent:()=> import('./components/blog/blog.component').then((c)=>c.BlogComponent)},
{path:'booking' , loadComponent:()=> import('./components/booking/booking.component').then((c)=>c.BookingComponent)},
{path:'destinations' , loadComponent:()=> import('./components/destinations/destinations.component').then((c)=>c.DestinationsComponent)},
{path:'contact' , loadComponent:()=> import('./components/contact/contact.component').then((c)=>c.ContactComponent)},
{path:'gallery' , loadComponent:()=> import('./components/gallery/gallery.component').then((c)=>c.GalleryComponent)},
{path:'privacy' , loadComponent:()=> import('./components/privacy/privacy.component').then((c)=>c.PrivacyComponent)},
{path:'tours' , loadComponent:()=> import('./components/tours/tours.component').then((c)=>c.ToursComponent)},
{path:'asked-questions' , loadComponent:()=> import('./components/asked-questions/asked-questions.component').then((c)=>c.AskedQuestionsComponent)},
{path:'blog-details' , loadComponent:()=> import('./components/blog-details/blog-details.component').then((c)=>c.BlogDetailsComponent)},
{path:'destination-details' , loadComponent:()=> import('./components/destination-details/destination-details.component').then((c)=>c.DestinationDetailsComponent)},
{path:'terms' , loadComponent:()=> import('./components/terms/terms.component').then((c)=>c.TermsComponent)},
{path:'tour-details' , loadComponent:()=> import('./components/tour-details/tour-details.component').then((c)=>c.TourDetailsComponent)},
{path:'' ,redirectTo :'home', pathMatch: "full"},
{path:'**',component:Error404Component}

]}
];


@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule],

})

export class usermodule {}
