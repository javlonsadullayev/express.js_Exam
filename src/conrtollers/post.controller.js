const { globalError, ClientError } = require("shokhijakhon-error-handler");
const myReadFile = require("../utils/myReadFile");
const myWritefile = require("../utils/myWriteFile");

module.exports = {
    async GET_ALL_POSTS(req, res) {
        try {
            const posts = await myReadFile("posts.json");
            return res.json({ posts, status: 200 });
        } catch (err) {
            return globalError(err, res);
        }
    },

    async CREATE_POST(req, res) {
        try {
            let newPost = req.body;
            const posts = await myReadFile("posts.json");

            newPost = { id: posts.length ? posts.at(-1).id + 1 : 1, ...newPost }
            posts.push(newPost);

            await myWritefile("posts.json", posts);
            return res.status(201).json({ message: 'Post successfully created', status: 201 });
        } catch (err) {
            return globalError(err, res);
        }
    },

    async UPDATE_POST(req, res) {
        try {
            const postId = parseInt(req.params.id);
            let updatedData = req.body;
            const posts = await myReadFile("posts.json");

            const postIndex = posts.findIndex(post => post.id === postId);
            if (postIndex === -1) throw new ClientError('Post not found', 404);

            posts[postIndex] = { ...posts[postIndex], ...updatedData };
            await myWritefile("posts.json", posts);
            return res.json({ message: 'Post successfully updated', status: 200 });
        } catch (err) {
            return globalError(err, res);
        }
    },

    async DELETE_POST(req, res) {
        try {
            const postId = parseInt(req.params.id);
            const posts = await myReadFile("posts.json");

            const postIndex = posts.findIndex(post => post.id === postId);
            if (postIndex === -1) throw new ClientError('Post not found', 404);

            posts.splice(postIndex, 1);
            await myWritefile("posts.json", posts);
            return res.json({ message: 'Post successfully deleted', status: 200 });
        } catch (err) {
            return globalError(err, res);
        }
    },

    async GET_ONE_POST(req, res) {
        try {
            const postId = parseInt(req.params.id);
            const posts = await myReadFile("posts.json");

            const post = posts.find(post => post.id === postId);
            if (!post) throw new ClientError('Post not found', 404);

            return res.json({ post, status: 200 });
        } catch (err) {
            return globalError(err, res);
        }
    }
}