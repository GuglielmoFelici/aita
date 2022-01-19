import {Component, EventEmitter} from '@angular/core';
import {ThreadSimple} from "./models";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular';

    newThread = new EventEmitter<ThreadSimple>();

    addThread(t: ThreadSimple) {
        this.newThread.emit(t)
    }
}
