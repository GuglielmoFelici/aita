import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Thread} from "../../models";
import {AitaService} from "../../aita.service";

@Component({
    selector: 'app-thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

    @Input() thread: Thread | undefined;

    opened = false;
    showDelete = false;
    password: string = '';
    passwordError: string = '';
    @Output() threadDeleted = new EventEmitter<Thread>()

    constructor(private aitaService: AitaService) {
    }

    ngOnInit(): void {
    }

    viewOnReddit() {
        window.open(`https://www.reddit.com/${this.thread?.id}`, '_blank');
    }

    deleteThread() {
        if (this.thread?.id) {
            this.aitaService.deletePost(this.thread?.id, this.password).subscribe(
                _ => {
                    this.threadDeleted.emit(this.thread)
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
