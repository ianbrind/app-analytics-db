module.exports = {
    fields:{
        id: {
            type: "uuid",
            default: {"$db_function": "uuid()"}
        },
        name: "text",
        description: "text",
        created: "timestamp"
    },
    key: [["id"], "created"],
    indexes: ["name"],
    clustering_order: {"created": "desc"},
    options: {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated"
        }
    }
}