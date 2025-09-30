import mongoose from "mongoose";

const {Schema } = mongoose;

const ComplainSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description :{
        type :String,
        required:true
    },
    priority : {
        type : Number,
        required: true
    },
    status:{
        type:String,
        enum:["Pending","Active","Complete","Reject"],
        required:true
    },
    image: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Areas",
        required: true,
    },
},{
    timestamps:true
});

const Complain = mongoose.model("Complain",ComplainSchema)
export default Complain;