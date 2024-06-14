const express=require ('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app=express();
const port=5000;

// middleware
app.use(cors({
    origin: 'http://localhost:3000', // My frontend URL
  credentials: true
}));
app.use(bodyParser.json());

//mongodb connection
const mongoURI='mongodb://localhost:27017/ChemnitzData';

//connect to mongodb
mongoose.connect(mongoURI,{useNewUrlParser:true ,useUnifiedTopology: true,serverSelectionTimeoutMS: 5000, // Timeout for server selection
  socketTimeoutMS: 30000, // Socket timeout
  connectTimeoutMS: 30000, // Connection timeout
  })
.then(()=>console.log('Connect To MongoDB'))
.catch(err=>console.log('Error Connecting to MongoDB:',err));

// // Import models
// const School=require('./models/School');
// const Kindergarden=require('./models/Kindergarden');
// const SocialChildProject=require('./models/SocialChildProject');
// const SocialTeenagerProject=require('./models/SocialTeenagerProject');

// define routes
const schoolRoutes=require('./routes/schools');
const kindergardenRoutes=require('./routes/kindergardens');
const SocialChildProjectRoutes=require('./routes/socialchildprojects');
const SocialTeenagerProjectRoutes=require('./routes/socialteenagerprojects');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// const { protect } = require('./middleware/auth');

//use routes
app.use('/api/schools',schoolRoutes);
app.use('/api/kindergardens',kindergardenRoutes);
app.use('/api/socialchildprojects',SocialChildProjectRoutes);
app.use('/api/socialteenagerprojects',SocialTeenagerProjectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user',  userRoutes);

//start the server
app.listen(port,()=>{
    console.log(`Server running on Port ${port}`);
});

// mongodb://localhost:27017/ChemnitzData
