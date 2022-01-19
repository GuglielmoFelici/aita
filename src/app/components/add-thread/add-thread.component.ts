import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AitaService} from "../../aita.service";
import {ThreadSimple} from "../../models";

@Component({
    selector: 'app-add-thread',
    templateUrl: './add-thread.component.html',
    styleUrls: ['./add-thread.component.css']
})
export class AddThreadComponent implements OnInit {

    url: string = '';
    error = '';
    passwordError = '';
    @Output() newThread = new EventEmitter<ThreadSimple>();
    showAddThread = false;
    password: string = '';

    constructor(private aitaService: AitaService) {
    }

    ngOnInit(): void {
    }

    addThread() {
        this.error = ''
        this.passwordError = ''
        const urlParts = this.url.split('/')
        if (urlParts.length != 9 || !this.url.startsWith('https://www.reddit.com/r/')) {
            this.error = 'Inserisci il link di un post di reddit.'
            return
        }

        const urlSegments = this.url.split('/')
        const threadId = urlSegments[urlSegments.length-3]
        this.aitaService.addPost(threadId, this.password).subscribe(
            response => {
                this.newThread.emit(response)
                this.url = ''
                this.showAddThread = false
            },
            error => {
                if (error.status === 409) {
                    this.error = 'Sembra che il post sia già presente.'
                } else if (error.status === 404) {
                    this.error = 'Impossibile trovare un post a questo indirizzo.'
                } else if (error.status === 401) {
                    this.passwordError = 'Password errata.'
                } else {
                    this.error = 'Errore sconosciuto :('
                }
            }
        )
    }

    cleanError() {
        this.error = '';
    }
}
