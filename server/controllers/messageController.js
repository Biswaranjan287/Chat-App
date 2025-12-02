import Message from "../models/message.js"
import User from "../models/User.js"


/* Get all user except login user */
export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password")

        /* Count number of messages not seen */
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message({ senderId: user._id, receiverId: userId, seen: false })
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length
            }
        })
        await Promise.all(promises)
        res.json({ success: true, filteredUsers, unseenMessages })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}