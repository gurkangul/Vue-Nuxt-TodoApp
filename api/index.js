const express=require("express")
const app=express()
const mongoose=require("mongoose")

//mongoose.connect("mongodb+srv://ggadmin:ggtest123@cluster0.xu0n6.mongodb.net/testDb?retryWrites=true&w=majority", {useNewUrlParser:true})
mongoose.connect("mongodb://localhost/testDb", {useNewUrlParser:true})

const TodoModel=mongoose.model("todo",{text:String})

app.get("/get-all",(req,res)=>{
    let todoDocs=TodoModel.find({},(err,docs)=>{
        res.status(200).json({
            docs:docs
        })
    })

})

app.post("/save",(req,res)=>{
    const newTodoItem=new TodoModel({
        text:req.body.todoText
    })

    newTodoItem.save().then(response=>{
        res.status(200).json({
            data:response
        })
    })

})

app.post("/delete",(req,res)=>{
    console.log(req.body)

    let todo=req.body.todo

    TodoModel.findOneAndRemove({_id:todo._id},()=>{
        res.status(204).json({
            message:"deleted"
        })
    })

})
app.put("/update",(req,res)=>{
    let todo=req.body.todo

    TodoModel.findByIdAndUpdate({_id:todo._id},{text:todo.text},()=>{
        res.status(200).json({
            message:"updated"
        })
    })

})


module.exports={
    path:"/api",
    handler:app
}