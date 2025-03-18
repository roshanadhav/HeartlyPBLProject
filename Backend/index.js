import express from 'express' ;
import cors from 'cors' ;
import htpp from 'http';
import authRouter from './routes/authRouter.js';
import connection from './database/db.js';
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRouter.js';
import multer from 'multer';
import axios from 'axios';
const app = express() ;
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
connection();
const server = htpp.createServer(app) ; 

app.use(cors({
    origin: ["https://safetyfy-app.vercel.app" ,"http://10.0.2.2:8081"],
    credentials: true,
    methods: ["GET", "POST"],
}));






  const upload = multer({ dest: "uploads/" });



  // const response = await axios.post("http://localhost:5000/predict", {
  //   features: [34,0,1,118,210,0,1,192,0,0.7,2,0,2], 
  // });
  // console.log(response.data.prediction)
app.post("/predict", async (req, res) => {
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        features: req.body.features, 
      });
  
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

    

app.use('/api/auth' , authRouter);
app.use('/api/user' , userRouter)
app.get('/',(req,res)=>{
    res.send('hello')
})
server.listen(5000 , ()=>{
    console.log('server is listning on port 5000')
})

