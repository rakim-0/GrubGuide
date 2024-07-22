const creationRule = {
    rest_id: "required|integer",
    menu_type: "required|in:morning,lunch,dinner",
    rating: "numeric",
    gallery_image: "string|max:255",
};

const updationRule = {
    rest_id: "integer",
    id: "required|integer",
    menu_type: "in:morning,lunch,dinner",
    rating: "numeric",
    gallery_image: "string|max:255",
};
module.exports = { updationRule, creationRule };
