import { Component, OnDestroy, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Observable, map } from 'rxjs';
import * as XLSX from 'xlsx';
import { HandletokenService } from '../services/handletoken.service';
import { Router } from '@angular/router';
// import axios from 'axios';
// import { UsersDto } from '../dto/users.dto';

interface User {
  readonly id: string;
  readonly roles: string[];
  readonly email: string;
  readonly password: string;
}

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit, OnDestroy {

  constructor(
    private userService: DataService,
    private tokenService: HandletokenService,
    private routes: Router) {}

  user: User[] = []

  data$ = new Observable<User>

  outputRoute: string = this.routes.url

  p: number = 1
  
  testValue = new FormGroup({
    testValue1: new FormControl({value: false, disabled: false})
  })
  
  @Output() messageEvent = new EventEmitter<string>()

  @ViewChild('tableOfUsers') tableOfUsers: ElementRef

  sendRoute() {
    this.messageEvent.emit(this.outputRoute)
  }

  private showUsers(): void {
    this.userService.getUsers()
    .pipe(map(response => {
      if(response) {
        return Object.values(response)
      }
      return []
    })).subscribe({
      next: _ => 
      { 
        this.user = _
        console.log(this.user[0].roles)
      }
    })
  }

  ngOnInit(): void {
    this.showUsers()
  }

  ngOnDestroy(): void {
    
  }

  inputForm = new FormGroup({
    inputValue: new FormControl('Начните вводить требования', Validators.required),
  })

  

  readonly columns = ['Id', 'Role', 'Email', 'Password', 'Actions']

  searchText: string = ''

  exportUsers() {
    // var checkboxes: any = Array.from(document.querySelectorAll('input[name="data"]:checked'))

    // console.log(checkboxes)
    
    // var sheet: any = XLSX.utils.aoa_to_sheet([["Data"]])

    // var workbook: any = XLSX.utils.book_new()

    // checkboxes.forEach((checkboxe: any) => {
    //   var data = checkboxe.value
    //   XLSX.utils.sheet_add_aoa(sheet, [[data]], {origin: -1})
    // })

    // XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1')
    // XLSX.writeFile(workbook, 'data.xlsx')

    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.tableOfUsers.nativeElement)
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, 'Users.xlsx')
  }

  reverse = true
  
  sortData() {
    if(this.reverse) {
      let newArray = this.user.sort((a:any,b:any)=> b.id - a.id)
      this.reverse = !this.reverse;
    }
    else if(!this.reverse){
      let newArray = this.user.sort((a:any,b:any)=> a.id - b.id)
      this.reverse = !this.reverse
    }
  }

  // saveFile(file: any, filename: any) {
  //   const fileBinary = Buffer.from(file, 'binary');
  //     const blob = new Blob([fileBinary], { type: 'application/vnd.ms-excel' })
  //     if (window.navigator.msSaveOrOpenBlob) {
  //       navigator.msSaveBlob(blob, filename);
  //     } else {
  //       const href = URL.createObjectURL(blob)
  //       const a = document.createElement('a')
  //       a.style.display = 'none';
  //       a.href = href
  //       a.download = `${filename}.xlsx`
  //       a.click()
  //       URL.revokeObjectURL(a.href)
  //     }
  // }
  
  // export(ids: any) {
  //   axios({
  //     method: 'POST',
  //     url: 'Back end route address',
  //     data: {ids: ids.join(',')}
  //   }).then(({data}) => {
  //       this.saveFile(data, 'Excel form')
  //   })
  // }
  
    // users: readonly User[] = [
    //     {
    //         id: 'Michael Palin',
    //         role: 'm.palin@montypython.com',
    //         email: 'alive',
    //         password: ['Funny'],
    //     },
    //     {
    //         id: 'Eric Idle',
    //         role: 'e.idle@montypython.com',
    //         email: 'alive',
    //         password: ['Funny', 'Music'],
    //     },
    //     {
    //         id: 'John Cleese',
    //         role: 'j.cleese@montypython.com',
    //         email: 'alive',
    //         password: ['Funny', 'Tall', 'Actor'],
    //     },
    //     {
    //         id: 'Terry Jones',
    //         role: '',
    //         email: 'deceased',
    //         password: ['Funny', 'Director'],
    //     },
    //     {
    //         id: 'Terry Gilliam',
    //         role: 't.gilliam@montypython.com',
    //         email: 'alive',
    //         password: ['Funny', 'Director'],
    //     },
    //     {
    //         id: 'Graham Chapman',
    //         role: '',
    //         email: 'deceased',
    //         password: ['Funny', 'King Arthur'],
    //     },
    // ];

    // remove(item: User): void {
    //     this.users = this.users.filter(user => user !== item);
    // }

}
