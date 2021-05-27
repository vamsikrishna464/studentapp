import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {
  createstudentForm: any;

  studentForm = this.fb.group({
    name: ['', Validators.required],
    gender: [''],
    terms:[''],
    dept:[''],
    comment:[''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      country:[''],
      zip: ['']
    }),
    age: ['', Validators.required],
    college: ['', Validators.required]
  });
  employee: any;
  isEditEmployee:boolean = false;
  countries = [{country_name:"India", country_code:"IN"}, {country_name:"United States", country_code:"USA"}];
  states = [{state_name:"Andhra Pradesh", country_code:"AP"}, {state_name:"Telangana", country_code:"TS"}];

  departments = [{dept_name:"EEE", dept_id:1}, {dept_name:"CSE", dept_id:2},{dept_name:"CE", dept_id:3},{dept_name:"ECE", dept_id:4}];
  constructor(private ServiceStudent: StudentService, private fb: FormBuilder, private router: Router,
    private routerParam: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.routerParam.snapshot.params["studentid"] != ("" || null || undefined)){
      let empid = this.routerParam.snapshot.params["studentid"];
      this.employee = this.ServiceStudent.getStudent(empid);
      this.studentForm.patchValue(this.employee);
      this.isEditEmployee = true;
    }
  }

  addStudent() {
    let employeeData = this.studentForm.value;
    employeeData.id = this.makeRandomId();
    console.log(JSON.stringify(this.studentForm.value))
    this.ServiceStudent.addStudent(employeeData);
    this.router.navigate(["student-list"]);
  }
  updateStudent() {
    let updateEmployeeData = this.studentForm.value;
    updateEmployeeData.id =  this.employee.id;
    this.ServiceStudent.updateStudent(updateEmployeeData);
    this.router.navigate(["student-list"]);
  }
  cancelEmployee() {
    this.router.navigate(["student-list"]);
  }

  makeRandomId(){
    let text = "";
    let possible = "ABCEDabcd0123456";
    for(var i = 0; i<10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
