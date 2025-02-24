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
