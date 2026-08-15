import { generateNanoId } from "../utils/helper.js"
import urlSchema from "../models/short_url.model.js"
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js"
import { BadRequestError, ConflictError } from "../utils/errorHandler.js"

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = generateNanoId(7)
    if(!shortUrl) throw new BadRequestError("Short URL not generated")
    const savedUrl = await saveShortUrl(shortUrl,url)
    return savedUrl
}

export const createShortUrlWithUser = async (url,userId,slug=null) => {
    const shortUrl = slug || generateNanoId(7)
    if (slug) {
        const exists = await getCustomShortUrl(slug)
        if(exists) throw new ConflictError("This custom url already exists")
    }

    const savedUrl = await saveShortUrl(shortUrl,url,userId)
    return savedUrl
}