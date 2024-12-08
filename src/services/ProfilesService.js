import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Account } from "@/models/Account.js"
import { AppState } from "@/AppState.js"
import { Post } from "@/models/Post.js"

class ProfilesService {
    async getProfileById(profileId) {
        AppState.activeProfile = null
        const response = await api.get(`api/profiles/${profileId}`)
        logger.log('GOT PROFILE 💂‍♀️', response.data)
        const profile = new Account(response.data)
        AppState.activeProfile = profile
    }
    async changePostPage(pageNumber) {
        const response = await api.get(`/api/posts?page=${pageNumber}`)
        logger.log('changed post page✅✅', response.data)
        const posts = response.data.posts.map(postPOJO => new Post(postPOJO))
        AppState.posts = posts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.pages
    }
}

export const profilesService = new ProfilesService()