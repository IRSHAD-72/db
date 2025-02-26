import express from "express";
import mongoose from "mongoose";
 

const app = express();
const port = 3002;

app.use(express.json());  
app.use(express.urlencoded({ extended: true }))
 


const mongoURI = "mongodb+srv://irshad:irshadsheikh@cluster1.d60cj.mongodb.net/cluster1?retryWrites=true&w=majority";
mongoose.connect(mongoURI,{});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});


const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cellphone1: { type: String, required: true },
  cellphone2: { type: String, default: null },
  homenumber: { type: String, default: null },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  emailid: { type: String, required: true, unique: true },
  jobTitle: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  dateOfJoining: { type: Date, required: true },
  languages: { type: [String], required: true },
  ofPaidVacationDaysAllowed: { type: Number, required: true, default: 15 },
  ofPaidSickVacationAllowed: { type: Number, required: true, default: 5 },
  employeeStatus: { type: String, required: true, default: "Active" },
});


const User = mongoose.model("User", dataSchema);


app.post("/submit-form", async (req, res) => {
  try {
console.log("Recevived Data",req.body);
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


app.get("/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id); 
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving user data", error });
    }
  });
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving user data", error });
    }
  });

   app.put("/users/:id", async (req, res) => {
  const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "User updated!", users: updateduser });
});

 
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "user deleted!" });
});
 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
