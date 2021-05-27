import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }
  allStudents:any = [{"name":"Sudharsan","id":"203","gender":"Male","terms":"true","dept":"EEE","address":{"street":"Street","city":"City","state":"Andhra Pradesh","country":"India","zip":"516227"},"age":"23","college":"Global College", "comment":"Makes me better"}];
  getAllStudents(){
    return this.allStudents;
  }
  
  addStudent(student:any){
    this.allStudents.push(student);
  }

  deleteStudent(student: any){
    let index = this.allStudents.indexOf(student);
    if (index > -1) {
      this.allStudents.splice(index, 1);
    }
  }
  getStudent(id:number){
    return this.allStudents.find((emp:any) => emp.id == id)
  }
  updateStudent(student:any){
    this.allStudents.forEach((data:any, index:any) => {
      if(data.id == student.id){
        this.allStudents[index] = student;
      }
    });
  }
}
