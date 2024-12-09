import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"
import { Commercial } from "@/models/Commercial.js"

class PostsService {
    async deletePost(postId) {
        const response = await api.delete(`api/posts/${postId}`)
        logger.log('DELETED CAR 💥', response.data)
        const postIndex = AppState.posts.findIndex(post => post.id == postId)

        if (postIndex == -1) {
            throw new Error("You messed up the find on the Index")
        }

        AppState.posts.splice(postIndex, 1)
    }
    async createPost(editablePostData) {
        const response = await api.post('api/posts', editablePostData)
        logger.log('created post', response.data)
        const post = new Post(response.data)
        AppState.posts.unshift(post)
    }

    async changeSearchPage(pageNumber, searchQuery) {
        const response = await api.get(`api/posts?query=${searchQuery}&page=${pageNumber}`)
        logger.log('CHANGED SEARCH PAGE 🔍', response.data)
        this.handleResponseData(response.data)
    }
    clearPosts() {
        AppState.posts = []
        AppState.currentPage = 0
        AppState.totalPages = 0
    }
    async searchPosts(searchQuery) {
        const response = await api.get(`api/posts?query=${searchQuery}`)
        logger.log('Searched Posts 🔍', response.data)
        this.handleResponseData(response.data)
    }
    async changePostPage(pageNumber) {
        const response = await api.get(`/api/posts?page=${pageNumber}`)
        logger.log('changed post page✅✅', response.data)
        this.handleResponseData(response.data)
    }
    async admirePosts(id) {
        const response = await api.post(`api/posts/${id}/like`)
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
        this.handleResponseData(response.data)
    }
    handleResponseData(responseData) {
        const posts = responseData.posts.map(postPOJO => new Post(postPOJO))
        AppState.posts = posts
        AppState.currentPage = responseData.page
        AppState.totalPages = responseData.total_pages
    }

}
export const postsService = new PostsService()