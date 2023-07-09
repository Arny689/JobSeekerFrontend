import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  { path: 'mainpage', component: MainpageComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'post', component: PostsComponent },
  { path: '**', component: AuthenticationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
