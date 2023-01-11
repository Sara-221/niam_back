const { Schema, model } = require('mongoose')

const RecipeSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    time: {
        type: String,
    },
    url: {
        type: String
    },
    ingredients: {
        type: String
    },
    method: {
        type: String
    },
    notes: {
        type: String
    }
})

module.exports = model('Recipe', RecipeSchema)