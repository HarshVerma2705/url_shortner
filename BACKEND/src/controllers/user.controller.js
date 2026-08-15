import wrapAsync from "../utils/tryCatchWrapper.js"
import { getAllUserUrlsDao, deleteUserUrlDao } from "../dao/user.dao.js"
import { NotFoundError } from "../utils/errorHandler.js"

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

export const deleteUserUrl = wrapAsync(async (req, res) => {
    const { id } = req.params
    const { _id } = req.user
    const deletedUrl = await deleteUserUrlDao(id, _id)
    
    if (!deletedUrl) {
        throw new NotFoundError("Short URL not found or unauthorized")
    }

    res.status(200).json({ message: "URL deleted successfully" })
})