const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

let students = [];

app.post("/students" , (req , res)=>{
    const student = req.body;
    students.push(student);
    res.status(201).json({
        message : "Student added successfully"
    });
    console.log(student);
});

app.get("/students" , (req , res)=>{
    res.status(200).json(students);
});

app.get("/students/:id" , (req , res)=>{
    const id = req.params.id;
    const student = students.find(student => student.id === id);
    if(student){
        res.status(200).json({
            message : "Student found",
            student : student
        });
    }
    else {
        res.status(404).json({
            message : "Student not found"
        });
    }
    console.log(student);
});


app.put("/students/:id" , (req , res)=>{
    const id = req.params.id;
    const studentIndex = students.findIndex(student => student.id === id);
    if(studentIndex !== -1){
        students[studentIndex] = req.body;
        res.status(200).json({
            message : "Student updated successfully"
        });
    }
    else {
        res.status(404).json({
            message : "Student not found"
        });
    }
    console.log(students[studentIndex]);
});


app.delete("/students/:id" , (req , res)=>{
    const id = req.params.id;
    const idx = students.findIndex(student => student.id === id);
    if(idx != -1){
        students.splice(idx , 1);
        res.status(200).json({
            message : "Student deleted successfully"
        });
    }
    else {
        res.status(404).json({
            message : "Student not found"
        });
    }
});

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000");
});