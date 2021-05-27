import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dept', 'age', 'college','comment' ,'actions'];
  dataSource:any;
  employeeList:any[] = [];
  constructor(private router:Router, private servicestudent:StudentService) {
    this.employeeList = this.servicestudent.getAllStudents();
    this.dataSource = new MatTableDataSource(this.employeeList);
  }

  ngOnInit(): void {
  }
  editEmployee(element: any) {
    console.log(element);
    this.router.navigate(["student-create/"+element.id])
  }
  deleteStudent(element: any) {
    this.servicestudent.deleteStudent(element);
    this.dataSource = new MatTableDataSource(this.employeeList);
  }
}
