import { Account } from "./Account.js"

export class Post {

    constructor(data) {
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.id = data.id
        this.creator = new Account(data.creator)
    }

}