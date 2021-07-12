const mongoose = require("mongoose");
const $baseSchema = require("./$baseSchema");
const $baseModel = require("./$baseModel");
const _ = require("lodash");




const postSchema = new mongoose.Schema(
    {
        depth: {
            type: Number,
            required: true,
        },
        parents: [
            {
                type: Number,
                ref: 'post'
            }
        ],
        directParent: {
            type: Number,
            ref: "post",
        },
        author: {
            type: Number,
            ref: "user",
            required: true,
        },

        images: [{ type: String }],
        content: {
            type: String,
            // required: true,
        },
        reactions: [reactionSchema()],

        comments: [
            {
                type: Number,
                ref: 'post'
            }
        ],
        isShared: {
            type: Boolean,
            default: false
        },
        headerOfShare: {// if user wqant to add some content about shared post 
            type: String,
        },

        sharedPost: {
            type: Number,
            ref: 'post'
        }
    },
    { timestamps: true }
);

postSchema.virtual("kind").get(function () {
    if (this.depth === 0) return "post";
    else if (this.depth === 1) return "comment";
    else if (this.depth === 2) return "reply";
    return null;
});
const response = (doc, options) => {

    if (options) {
        if (options.authUser) {
            let key = _.findKey(doc.reactions, { user: options.authUser })
            doc.flavor = key !== undefined ? doc.reactions[key].flavor : null

        }

    }
    return {
        id: doc.id,
        kind: doc.kind,
        author: doc.author,
        images: doc.images,
        content: doc.content,
        isShared: doc.isShared,
        sharedPost: doc.sharedPost,
        headerOfShare: doc.headerOfShare,
        parents: doc.parents,
        flavor: doc.flavor,
        directParent: doc.directParent,
        metadata: {
            reactions: doc.reactions.length,
            comments: doc.comments.length
        },
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

module.exports = $baseModel("post", postSchema, {
    responseFunc: response,
});


// reaction subdocument
function reactionSchema() {
    const schema = new mongoose.Schema(
        {
            user: {
                type: Number,
                ref: "user",
                required: true,
            },
            flavor: {
                type: String,
                enum: ["like", "dislike", "love", "haha", "sad", "angry"],
                required: true,
            },
        },
        { _id: false }
    );

    schema.set("toJSON", {
        transform: function (doc, ret) {
            return {
                user: doc.user,
                flavor: doc.flavor,
            };
        },
    });

    return schema;
}
