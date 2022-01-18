import {Component, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular';

    newThread = new EventEmitter<string>();

    addThread(tid: string) {
        this.newThread.emit(tid)
    }
}
