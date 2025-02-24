// import express from "express";
// import mongoose, { Schema, SchemaType } from "mongoose";
// import bodyparser from "body-parser";

// const app = express()

// const type = String;



// const port =3000;
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:true
// }));

// mongoose.connect('mongodb+srv://irshad:irshad@321#12@cluster1.d60cj.mongodb.net/testdb?retryWrites=true&w=majority&appName=cluster1');
// const db=mongoose.connection
// db.on('error',console.error.bind(console,'connection error:'));
// db.once('open',function(){
//    console.log('connencted to mongodb');
// });



// const dataSchema = new mongoose.Schema ({
//     Name:{
//         require:true,
//         type: String
//      },
//      cellphone1:{
//         require:true,
//         type:Number
//      },
//      cellphone2:{
//         require:true,
//         type:Number
//      },
//      homenumber:{
//         require:true,
//         type:Number
//      },
//      address:{
//         require:true,
//         type:String
//      },
//      city:{
//         require:true,
//         type:String
//      },
//      state:{
//         require:true,
//         type:String
//      },
//      emailid:{
//       require:true,
//       type:String
//  },
//  jobtitle:{
//    require:true,
//    type:String
//  },
//  paymenttmethed:{
//    require:true,
//    type:String
//  },
//  dateofbrith:{
//    require:true,
//    type:Date
//  },
//  dateofjoining:{
//    require:true,
//    type:Date
//  },
//  langauges:{
//    require:true,
//    type:String
//  },
//  ofpaidvaccationdaysallowed:{
// require:true,
// type:Number
//  },
//  ofpaidsickvaccationallowed:{
//    require:true,
//    type:Number
//  },
//  employestutas:{
//    require:true,
//    type:String
//  }
// });
// const User=mongoose.model('user',
// dataSchema);
// app.post('/submit-form',(req,res)=>{
//    const newUser=new User({
//       Name:req.body.Name,
//       cellphone1,cellphone2,homenumber,
//       address,city,state,emailid,jobtitle,
//       paymenttmethed,dateofbrith,dateofjoining,
//       langauges,ofpaidsickvaccationallowed,ofpaidvaccationdaysallowed

//    });
// });
// newUser.save()
// .then(user=>{
// res.status(201).json({massage:'user added successfully!',user});
// })
// .catch(error=>{
//    res.status(500).json({massage:'Error usersavingdata',error});
// })
// app.use(express.json())
// app.listen(port, () => {
// console.log('server is started at ${port}')
// });
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoURI = "mongodb+srv://irshad:irshadsheikh@cluster1.d60cj.mongodb.net/testdb?retryWrites=true&w=majority";
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});


const dataSchema = new mongoose.Schema({
  name: { required: true, type: String },
  cellphone1: { required: true, type: Number },
  cellphone2: { required: true, type: Number },
  homenumber: { required: true, type: Number },
  address: { required: true, type: String },
  city: { required: true, type: String },
  state: { required: true, type: String },
  emailid: { required: true, type: String },
  jobTitle: { required: true, type: String },
  paymentMethod: { required: true, type: String },
  dateOfBirth: { required: true, type: Date },
  dateOfJoining: { required: true, type: Date },
  languages: { required: true, type: String },
  ofPaidVacationDaysAllowed: { required: true, type: Number },
  ofPaidSickVacationAllowed: { required: true, type: Number },
  employeeStatus: { required: true, type: String }
});

const User = mongoose.model("User", dataSchema);


app.post("/submit-form", async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      cellphone1: req.body.cellphone1,
      cellphone2: req.body.cellphone2,
      homenumber: req.body.homenumber,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      emailid: req.body.emailid,
      jobTitle: req.body.jobTitle,
      paymentMethod: req.body.paymentMethod,
      dateOfBirth: req.body.dateOfBirth,
      dateOfJoining: req.body.dateOfJoining,
      languages: req.body.languages,
      ofPaidVacationDaysAllowed: req.body.ofPaidVacationDaysAllowed,
      ofPaidSickVacationAllowed: req.body.ofPaidSickVacationAllowed,
      employeeStatus: req.body.employeeStatus
    });

    
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User added successfully!", user: savedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving user data", error });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
