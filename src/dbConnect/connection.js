const mongoose =require('mongoose')

const connectMongo = async()=>{
    try{

        const cc = await  mongoose.connect('mongodb+srv://mdatiq:atiqpass@cluster0.gf90lzd.mongodb.net/?retryWrites=true&w=majority') 
   console.log('data base connected');
    }catch(err){
        console.log(err);
    }
}

module.exports ={connectMongo}