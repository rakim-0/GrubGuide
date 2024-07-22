const creationRule = {
    name: "required|string",
    rating: "numeric|min:0|max:5",
    image: "string|max:255",
    description: "string",
    availability_time: "required|in:morning,lunch,dinner",
    tags: "required|string",
    price: "required|numeric|min:0",
    rest_id: "required|integer",
    menu_id: "required|integer",
};

const updationRule = {
    id: "required|numeric",
    name: "string",
    rating: "numeric|min:0|max:5",
    image: "string|max:255",
    description: "string",
    availability_time: "in:morning,lunch,dinner",
    tags: "string",
    price: "numeric|min:0",
    rest_id: "integer",
    menu_id: "integer",
};
module.exports = { updationRule, creationRule };
