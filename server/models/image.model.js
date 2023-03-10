import mongoose from "mongoose"

const imageSchema = new mongoose.Schema(
    {
        link: {type: String, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'UserData'},
        time: {type: String, required: true},
        comments: [{
            comment: {type: String},
            commentOwner: {type: String}
        }]
    },
    {collection: 'image-data'}
)

export const Image = mongoose.model('ImageData', imageSchema)
