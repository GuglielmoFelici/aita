import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment, Listing, Post, Thread, ThreadSimple} from "./models";
import {environment} from "../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AitaService {

    baseUrl = environment.baseUrl;


    constructor(private http: HttpClient) {
    }

    public getPosts(): Observable<ThreadSimple[]> {
        return this.http.get<ThreadSimple[]>(`${this.baseUrl}/posts`)
    }

    public getRedditPost(id: string): Observable<Thread> {
        return this.http.get<[Listing<Post>, Listing<Comment>]>(`${this.baseUrl}/posts/external/${id}`).pipe(
            map( res => ({
                id: id,
                post: res[0].data.children[0],
                comments: res[1].data.children,
            })),
        );
    }

    addPost(threadId: string, password: string): Observable<ThreadSimple> {
        const headers = new HttpHeaders().set('password', password)
        return this.http.post<ThreadSimple>(`${this.baseUrl}/posts/${threadId}`, {}, {headers})
    }

    deletePost(threadId: string, password: string) {
        const headers = new HttpHeaders().set('password', password)
        return this.http.delete(`${this.baseUrl}/posts/${threadId}`, {headers})
    }
}
