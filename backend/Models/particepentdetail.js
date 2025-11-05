const mongoose = require('mongoose')
const partSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    registernumber:{
        type:String,
        required:true,
    },
    present:{
        type:Boolean,
        default:false,
    }
}, { timestamps: true })

const partModel=mongoose.model("particepentdetail",partSchema)

module.exports={partModel}