import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';

interface TokenObj{
  token:any;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [ApiService]
})
export class AppComponent implements OnInit {
  books: any;
  clickAdministration = false
  clickStudent = false
  clickSignin = false
  input:any
  selectedBook:any;
  

  constructor(private api: ApiService, private cookieService: CookieService) { 
    
    this.selectedBook = {book_name:'', author_name:''};
    
  }

 
  
  ngOnInit(): void {
    this.input = {
      username : '',
      password : '',
      email: '',

    }
  }

  

  // registerUser(){
  //   this.api.registerNewUser(this.input).subscribe(
  //     response => {
  //       alert('User ' + this.input.username + ' has been created')
  //     }
  //   )
  // }

  loginUser(){
    this.api.loginUser(this.input).subscribe(
      (response: any) => {
        // console.log(response, this.input.username, this.input.password)
        alert('User ' + this.input.username + ' has been logged in')
        this.cookieService.set('book_token',response.token)
        this.getBooks()
        this.clickSignin = true
        this.clickAdministration = false
      }
    )
  }

  
  getBooks(){
    const Book_token = this.cookieService.get('book_token');
    console.log(Book_token)
    this.api.getAllBooks()
    .subscribe((data:any) => {
      this.books = data
      console.log('dtaa:',this.books)
    })
  }


  onAdministration(){
    // this.clickAdministration = true
    if(this.clickAdministration)
      {
        this.clickAdministration = false;
      }else{
        this.clickAdministration = true;
        this.clickStudent = false
        this.clickSignin = false
      }
  }


  OnStudent(){
    if(this.clickStudent)
      {
        this.clickStudent = false;
      }else{
        this.clickStudent = true;
        this.clickAdministration = false
      }
      this.api.getStudentBooks()
      .subscribe((data:any)=>{
        this.books = data
      })
  }


  bookClicked(book:any){
    this.api.getOneBook(book.id)
    .subscribe((data:any)=>{
      this.selectedBook = data;
    })
  }

  updateBook(){
    this.api.editBook(this.selectedBook)
    .subscribe((data:any)=>{
      this.getBooks();
    })
  }

  addBook(){
    this.api.AddBook(this.selectedBook)
    .subscribe((data:any)=>{
      this.books.push(data);
      this.selectedBook.book_name=''
      this.selectedBook.author_name=''
      this.selectedBook.quantity=''
      this.selectedBook.isbn=''
      this.selectedBook.category=''
    })
  }

  deleteBook(){
    this.api.DeleteBook(this.selectedBook.id)
    .subscribe((data:any)=>{
      this.getBooks();
      this.selectedBook.book_name=''
      this.selectedBook.author_name=''
      this.selectedBook.quantity=''
      this.selectedBook.isbn=''
      this.selectedBook.category=''
    })
  }

  
}
