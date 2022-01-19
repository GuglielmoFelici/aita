import {Component, Input, OnInit} from '@angular/core';
import {Thread, ThreadSimple} from "../../models";
import {AitaService} from "../../aita.service";
import {interval, Subject} from "rxjs";

@Component({
    selector: 'app-threads-list',
    templateUrl: './threads-list.component.html',
    styleUrls: ['./threads-list.component.css']
})
export class ThreadsListComponent implements OnInit {

    // Since reddit api only returns gigantic objects, threadSimples is essential cached information in the backend
    threadSimples: ThreadSimple[] = []
    failures = 0;

    @Input() addThread: Subject<ThreadSimple> | undefined
    searchFilter: string = '';

    constructor(private aitaService: AitaService) {
    }

    ngOnInit(): void {
        this.aitaService.getPosts().subscribe(
            posts => {
                this.threadSimples = posts;
                // this.loadFullThreads(posts)
            }
        )
        if (this.addThread) {
            this.addThread.subscribe(
                t => this.threadSimples.push(t)
            )
        }
        // check for new posts every 10 seconds
        interval(10000).subscribe(
            _ => this.aitaService.getPosts().subscribe(
                posts => {
                    if (!this.checkThreadArraysEquality(posts, this.threadSimples)) {
                        console.log("detected difference, updating threadsimples")
                        this.threadSimples = posts;
                        // this.loadFullThreads(posts);
                    }
                }
            )
        )
    }

    checkThreadArraysEquality(a: ThreadSimple[], b: ThreadSimple[]) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        a = a.slice().sort((t1,t2) => t1.id.localeCompare(t2.id))
        b = b.slice().sort((t1,t2) => t1.id.localeCompare(t2.id))

        for (let i = 0; i < a.length; ++i) {
            if (a[i].id !== b[i].id) return false;
        }
        return true;
    }

    // loadFullThreads(threadSimples: ThreadSimple[]) {
    //     this.threads = []
    //     threadSimples.forEach(t =>
    //         this.aitaService.getRedditPost(t.id).subscribe(
    //             post => {
    //                 this.threads.push(post)
    //             },
    //             _ => {
    //                 this.failures++;
    //             }
    //         )
    //     )
    // }

    get shownThreads() {
        if (this.searchFilter) {
            return this.threadSimples.filter(t =>
                t.title.toLowerCase().includes(this.searchFilter.toLowerCase())
            )
        } else {
            return this.threadSimples
        }
    }

    deleteThread(thread: ThreadSimple) {
        // this.threads = this.threads.filter(t => t !== thread)
        this.threadSimples = this.threadSimples.filter(t => t !== thread)
    }

    isShown(thread: ThreadSimple) {
        return !this.searchFilter || thread.title.toLowerCase().includes(this.searchFilter.toLowerCase());
    }
}
