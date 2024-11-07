import express from 'express';
import userAuthentification from "./routes/user_authentification"

const app = express()

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',userAuthentification)

app.get("/", async (req,res)=>{
    console.log(`${process.env.USER_SERVICE_URL}`);
    
    const test = await fetch(`${process.env.USER_SERVICE_URL}/user/register`, {
        method: "POST",
        body: JSON.stringify( {
            username: "jhon",
            password: "test1234",
            email: "de@gmail.fr"
        } ),
        headers:{
            "Content-Type":"application/json"
        },
        
    })
    
    
    res.statusCode = test.status
    res.statusMessage = test.statusText
    res.send(test)
})

app.listen(port,()=>{
    console.log(`exemple app listenning at ${port}`);
})