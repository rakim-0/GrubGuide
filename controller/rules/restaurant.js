const creationRule = {
    name: "required|string",
    address: "required|string",
    average_ratings: "numeric|min:0|max:5",
    total_ratings: "numeric|min:0",
    contact_email: "required|email",
    contact_name: "required|string",
    contact_phone: "required|string|min:10|max:10",
    delivery_ratings: "numeric|min:0|max:5",
    // open_time: "required|date",
    // closing_time: "required|date",
    latitude: "required|numeric",
    longitude: "required|numeric",
    tags: "required|string",
};

const updationRule = {
    id: "required|integer",
    name: "string",
    address: "string",
    average_ratings: "numeric|min:0|max:5",
    total_ratings: "numeric|min:0",
    contact_email: "email",
    contact_name: "string",
    contact_phone: "string|min:10|max:10",
    delivery_ratings: "numeric|min:0|max:5",
    open_time: "date",
    closing_time: "date",
    latitude: "numeric",
    longitude: "numeric",
    tags: "string",
};
module.exports = { updationRule, creationRule };
