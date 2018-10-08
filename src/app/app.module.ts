import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogComponent } from './blog/blog.component';
import { CommonService } from './common.service';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BlogEditorComponent } from './blog-editor/blog-editor.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },

  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '',
    component: HomepageComponent,
  },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogComponent,
    HomepageComponent,
    LoginComponent,
    BlogEditorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
    appRoutes,
    { enableTracing: true }),
    FormsModule,
    HttpModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
