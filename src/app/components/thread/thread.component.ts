import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Thread, ThreadSimple} from "../../models";
import {AitaService} from "../../aita.service";

@Component({
    selector: 'app-thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

    @Input() threadSimple: ThreadSimple | undefined;
    @Input() show = true;
    fullThread: Thread | undefined;

    opened = false;
    showDelete = false;
    password: string = '';
    passwordError: string = '';
    @Output() threadDeleted = new EventEmitter<ThreadSimple>()

    constructor(private aitaService: AitaService) {
    }

    ngOnInit(): void {
        if (this.threadSimple) {
            this.aitaService.getRedditPost(this.threadSimple.id).subscribe(
                fullThread => this.fullThread = fullThread
            )
        }
    }

    deleteThread() {
        if (this.threadSimple?.id) {
            this.aitaService.deletePost(this.threadSimple.id, this.password).subscribe(
                _ => {
                    this.threadDeleted.emit(this.threadSimple)
                    this.showDelete = false
                },
                error => {
                    if (error.status === 401) {
                        this.passwordError = 'Password errata.'
                    } else {
                        this.passwordError = 'Errore sconosciuto :('
                    }
                }

            )
        }
    }
}
