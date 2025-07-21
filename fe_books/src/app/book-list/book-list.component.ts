import { Component, NgModule, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  imports: [FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
books: Book[] = [];
newBook: Book = {
  id: 0,
  title: '',
  author: '',
  read: false
};

constructor(private bookService: BookService) { }

ngOnInit() {
  this.loadBooks();
}

loadBooks() {
  this.bookService.getBooks().subscribe(data => this.books = data)
}

addBook() {
  if (!this.newBook.title || !this.newBook.author) return;
  const { title, author, read } = this.newBook;
  this.bookService.createBook({ title, author, read }).subscribe(() => {
    this.newBook = { id: 0, title: '', author: '', read: false };
    this.loadBooks();
  });
}

deleteBook(id: number) {
  this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
}

updateBook(book: Book) {
  this.bookService.updateBook(book).subscribe(() => this.loadBooks());
}
}
