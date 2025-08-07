import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://booksappmaddie.onrender.com/books';

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: number) {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>('https://booksappmaddie.onrender.com/books', { book });
  }

  updateBook(book: Book) {
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }

  deleteBook(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMyBooks() {
    return this.http.get<Book[]>(`${environment.apiUrl}/my_books`);
  }

}
