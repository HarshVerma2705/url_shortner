import wrapAsync from "../utils/tryCatchWrapper.js"
import { getAllUserUrlsDao } from "../dao/user.dao.js"

export const getAllUserUrls = wrapAsync(async (req, res) => {
    const { _id } = req.user
    const urls = await getAllUserUrlsDao(_id)
    
    // Prepend APP_URL to each short_url
    const fullUrls = urls.map(u => ({
        ...u.toObject(),
        short_url: process.env.APP_URL + u.short_url
    }))
    
    res.status(200).json({ message: "success", urls: fullUrls })
})