import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    NgbModule,

    // AuthModule
    AuthModule.forRoot({
      domain: 'dev-ob4gwafsujzfuged.eu.auth0.com',  
      clientId: 'LdztHT6pYrwZk8c7DInolkVnuTtym72N',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/',
      },
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
