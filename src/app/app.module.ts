import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { TestComponent } from './test/test.component';
import {HttpClientModule} from "@angular/common/http";
import { ThreadComponent } from './components/thread/thread.component';
import { ThreadsListComponent } from './components/threads-list/threads-list.component';
import { AddThreadComponent } from './components/add-thread/add-thread.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        TestComponent,
        ThreadComponent,
        ThreadsListComponent,
        AddThreadComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
