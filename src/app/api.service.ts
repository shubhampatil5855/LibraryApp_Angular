import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  
  httpHeaders = new HttpHeaders({
    'Content-Type':'application/json',
  });

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  getAllBooks(): Observable<any>{
    return this.http.get(this.baseurl + '/api/books/',
    {headers: this.getAuthHeaders()});
  }

  getStudentBooks(): Observable<any>{
    return this.http.get(this.baseurl + '/api/student/',
    {headers: this.httpHeaders});
  }

  getOneBook(id:any):Observable<any>{
    return this.http.get(this.baseurl + '/api/books/' + id + '/',
    {headers:this.getAuthHeaders()});
  }

  editBook(book:any):Observable<any>{
    const body = {book_name: book.book_name, author_name: book.author_name, isbn: book.isbn, category: book.category, quantity: book.quantity}
    return this.http.put(this.baseurl + '/api/books/' + book.id + '/', body,
    {headers:this.getAuthHeaders()}); 
  }

  AddBook(book:any):Observable<any>{
    const body = {book_name: book.book_name, author_name: book.author_name, isbn: book.isbn, category: book.category, quantity: book.quantity}
    return this.http.post(this.baseurl + '/api/books/', body,
    {headers:this.getAuthHeaders()}); 
  }

  DeleteBook(id:any):Observable<any>{
    return this.http.delete(this.baseurl + '/api/books/' + id + '/',
    {headers:this.getAuthHeaders()});
  }

  // registerNewUser(userData:any){
  //   return this.http.post(this.baseurl + '/api/users/', userData)
  // }

  loginUser(userData:any){
    console.log(userData)
    return this.http.post(this.baseurl + '/api/auth/', userData,
    {headers:this.httpHeaders});
  }

  getAuthHeaders(){
    const token = this.cookieService.get('book_token');
    return new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: `Token ${token}`
    });
  }


}
