import {Component, Input, OnInit} from '@angular/core';
import {Thread} from "../../models";
import {AitaService} from "../../aita.service";
import {finalize} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'app-threads-list',
    templateUrl: './threads-list.component.html',
    styleUrls: ['./threads-list.component.css']
})
export class ThreadsListComponent implements OnInit {

    postIds: string[] = []
    threads: Thread[] = [];
    failures = 0;

    @Input() addThread: Subject<string> | undefined
    searchFilter: string = '';

    constructor(private aitaService: AitaService) {
    }

    ngOnInit(): void {
        this.aitaService.getPosts().subscribe(
            posts => {
                this.postIds = posts
                posts.forEach(p =>
                    this.aitaService.getRedditPost(p).subscribe(
                        post => {
                            this.threads.push(post)
                        },
                        _ => {
                            this.failures++;
                        }
                    )
                )
            }
        )
        if (this.addThread) {
            this.addThread.subscribe(
                tid => {
                    this.postIds.push(tid)
                    this.aitaService.getRedditPost(tid).subscribe(post => this.threads.push(post))
                }
            )
        }
    }

    get shownThreads() {
        if (this.searchFilter) {
            return this.threads.filter(t =>
                t.post.data.title.toLowerCase().includes(this.searchFilter.toLowerCase())
                || t.post.data.selftext.toLowerCase().includes(this.searchFilter.toLowerCase())
            )
        } else {
            return this.threads
        }
    }

    deleteThread(thread: Thread) {
        this.threads = this.threads.filter(t => t !== thread)
        this.postIds = this.postIds.filter(id => id !== thread.id)
    }
}
