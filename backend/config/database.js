const mongoose=require("mongoose");
const connectDatabase=()=>{
// mongoose.set('strictQuery', false); // Suppress the warning
// mongoose.connect(process.env.DB_URI).then((data)=>{
//     console.log(`Connected to db with server at ${data.connection.host}`);
// })

console.log(process.env.DB_URI)

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(process.env.DB_URI)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

}
module.exports=connectDatabase