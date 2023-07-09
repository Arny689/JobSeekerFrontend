import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiSvgModule, TuiButtonModule } from "@taiga-ui/core";
import { TuiTextAreaModule, TuiInputPasswordModule, TuiInputModule } from '@taiga-ui/kit';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { InterceptorInterceptor } from "./services/interceptor.interceptor";
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    MainpageComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
      BrowserAnimationsModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule,
      TuiInputPasswordModule,
      TuiTextAreaModule,
      TuiInputModule,
      TuiSvgModule,
      TuiButtonModule
],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
