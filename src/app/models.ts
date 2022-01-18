export interface RedditObject {
    kind: string
}

export interface Thread {
    id: string,
    post: Post,
    comments: Comment[]
}

export interface Post extends RedditObject {
    data: {
        title: string,
        selftext: string,
        score: number,
        author: string,

    }
}

export interface Comment extends RedditObject {
    data: {
        author: string,
        body: string,
        replies: Listing<Comment>
    }
}

export interface Listing<T> extends RedditObject {
    data: {
        children: T[]
    }
}
