const Comment = require("../models").Comment;

module.exports = {
    async postComment(req, res) {
        let user_id = req.id;

        const postComment = await Comment.create({
            user_id: user_id,
            event_id: req.params.eventId,
            description: req.body.description,
        })

        .then((data) => {
            res.status(201).json({
                msg: "comment sudah dibuat bos",
                data,
            });
        })

        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "error" });
        });
    },
};
