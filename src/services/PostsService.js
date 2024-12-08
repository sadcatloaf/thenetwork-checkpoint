import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"
import { Commercial } from "@/models/Commercial.js"

class PostsService {
    async admirePosts(id) {
        const response = await api.post(`api/posts/${id}`)
        logger.log('admire posts ❤️💬💬', response.data)
    }
    async getAnnoyingCommercials() {
        const response = await api.get('api/ads')
        logger.log('Got commercials📺📺', response.data)
        const commercials = response.data.map(adPOJO => new Commercial(adPOJO))
        AppState.commercials = commercials
    }
    async getPostsByCreatorId(profileId) {
        const response = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log('Got posts by creator Id', response.data)
        const posts = response.data.posts.map(blogPOJO => new Post(blogPOJO))
        AppState.posts = posts
    }

    async getPosts() {
        const response = await api.get('api/posts')
        logger.log('Got Posts 💬', response.data)
        const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
        AppState.posts = posts
    }

}
export const postsService = new PostsService()