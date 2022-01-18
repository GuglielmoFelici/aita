import {Component, OnInit} from '@angular/core';
import {AitaService} from "../aita.service";
import {Thread} from "../models";

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

    threads: Thread[] = [];

    constructor(private aitaService: AitaService) {
    }

    ngOnInit(): void {
        this.aitaService.getPosts().subscribe(
            posts => posts.forEach(p =>
                this.aitaService.getRedditPost(p).subscribe(
                    post => this.threads.push(post)
                )
            )
        )
    }

}
