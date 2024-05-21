#! usr/bin/env node

import inquirer from "inquirer";
//Define the student class 
class Student{
    static counter = 10000;
    id: number;
    name: string[];
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = Student.counter++;
        this.name = [];
        this.courses = [];  // Initialize An Empty Array For Courses
        this.balance = 100;
    }
// Method To Enroll A Student In A Course
enroll_course(course: string){
    this.courses.push(course);
}
//Method To View A Student Balance
view_balance(){
    console.log(`Balance for ${this.name} : $${this.balance}`);
}
//Mehtod To Pay Student Fees
pay_fees(amount: number){
    this.balance -= amount;
    console.log(`$${amount} Fees paid successfully for ${this.name}`);
}
//Method To Display Student Status 
show_status(){
    console.log(`ID: ${this.id}`);
    console.log(`ID: ${this.name}`);
    console.log(`ID: ${this.courses}`);
    console.log(`ID: ${this.balance}`);
  }
}

//Defining a Student Manager Class To Manage Student 
class Student_manager{
    Students: Student[]

        constructor(){
          this.Students = [];
        }
    //Method to Add a New Student
    add_student(name:string){
       let student = new Student(name);
       this.Students.push(student);
       console.log(`Student: ${name} adde successfully. Student ID:${student.id}`);
    }
   // Method To Enroll a Student In a Course
   enroll_Student(student_id: number, course:string){
    let student = this.find_student(student_id);
    if(student){
        student.enroll_course(course);
        console.log(`${student.name} enrolled in ${course} successfully`);
    }
   }
   //Method To View a Student Balance 
   view_student_balance(student_id: number){
    let student = this.find_student(student_id);
    if(student){
       student.view_balance();
    }
    else{
        console.log("Student not found. Please enter a correct student ID ")
    }

   }
   //Method To Pay Student Fees
pay_student_fees(student_id: number, amount: number){
    let student = this.find_student(student_id);
    if(student){
        student.pay_fees(amount);
    }
    else{
        console.log("Student not found. Please enter a correct student ID")
       
    }
}

//Method To Display Student Status 
show_student_status(student_id:number){
    let student = this.find_student(student_id);
    if(student){
        student.show_status();
    }
}

   //Method To Find a Student By Student_id
   find_student(student_id:number){
    return this.Students.find(std => std.id === student_id);
   }
}

// Main Function To Run The Program 
async function main(){
    console.log("Welcome to 'CodeWithNoor' - Student Management System");
    console.log("-".repeat(50));

    let student_manager = new Student_manager();

    //While Loop To Keep Program Running 
    while(true){
        let choice = await inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "Select an option",
            choices: [
               "Add Student",
               "Enroll Student",
               "View Student Balance",
               "Pay Fees",
               "Show Status",
               "Exit"
            ]
        }
    ]);

    //Using Switch Case To Handle User Choice 
switch(choice.choice){
    case "Add Student":
    let name_input = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter a Student Name",
        }
    ]);
    student_manager.add_student(name_input.name);
    break;

    case "Enroll Student":
        let course_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: "Enter a Student ID",
            },
            {
                name: "course",
                type: "input",
                message: "Enter a Course Name",
            }
        ]);
        student_manager.enroll_Student(course_input.student_id, course_input.course);
        break;

        case"View Student Balance":
        let balance_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: "Enter a Student ID",
            }
        ]);
        student_manager.view_student_balance(balance_input.student_id);
        break;

        case"Pay Fees":
        let fees_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: "Enter a Student ID",
            },
            {
                name: "amount",
                type: "number",
                message:"Enter The Amount To Pay"
            }
        ]);
        student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
        break;

        case"Show Status":
        let status_input = await inquirer.prompt([
            {
                name: "student_id",
                type: "number",
                message: "Enter a Student ID"
            }
        ]);
        student_manager.show_student_status(status_input.student_id);
        break;

        case"Exit":
        console.log("Exiting...");
        process.exit();
}

    }   
    
 }
 
 // Calling a Main Function
 main();