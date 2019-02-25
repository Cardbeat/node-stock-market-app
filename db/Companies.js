let mongoose = require('mongoose')
const Schema = mongoose.Schema


let CompaniesSchema = new Schema({
    companies: Array
})

let Companies = mongoose.model('Companies', CompaniesSchema)

module.exports = Companies