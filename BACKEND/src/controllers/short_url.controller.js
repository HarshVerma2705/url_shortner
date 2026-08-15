import { getShortUrl } from "../dao/short_url.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"
import { BadRequestError, NotFoundError } from "../utils/errorHandler.js"

export const createShortUrl = wrapAsync(async (req,res)=>{
    const data = req.body
    if(!data || !data.url) {
        throw new BadRequestError("URL is required")
    }
    let urlDoc
    if(req.user){
        urlDoc = await createShortUrlWithUser(data.url,req.user._id,data.slug)
    }else{  
        urlDoc = await createShortUrlWithoutUser(data.url)
    }
    const appUrl = process.env.APP_URL || 'http://localhost:3000/'
    const fullShortUrl = appUrl.endsWith('/') ? appUrl + urlDoc.short_url : appUrl + '/' + urlDoc.short_url
    res.status(200).json({ _id: urlDoc._id, shortUrl: fullShortUrl, url: { ...urlDoc.toObject(), short_url: fullShortUrl } })
})


export const redirectFromShortUrl = wrapAsync(async (req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(!url) throw new NotFoundError("Short URL not found")
    let targetUrl = url.full_url
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'http://' + targetUrl
    }
    res.redirect(targetUrl)
})