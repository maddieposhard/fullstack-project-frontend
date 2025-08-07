import { Component, NgModule, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  imports: [FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null; // selects a book when clicked for viewing details in a modal
  title: string = '';
  author: string = '';
  read: boolean = false;
  newBook: Book = {
    id: 0,
    title: '',
    author: '',
    read: false,
    cover_image_url: '',
  };

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getMyBooks().subscribe(books => {
      this.books = books;
    })
  }

  loadBooks() {
    this.bookService.getMyBooks().subscribe((data) => (this.books = data));
  }

  addBook() {
    if (!this.newBook.title || !this.newBook.author) return;
    const { title, author, read } = this.newBook;
    this.bookService.createBook({ title, author, read }).subscribe(() => {
      this.newBook = { id: 0, title: '', author: '', read: false , cover_image_url: '' }; // reset form
      this.loadBooks();
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
  }

  submitUpdate() {
    if (this.selectedBook) {
      this.bookService.updateBook(this.selectedBook).subscribe(() => {
        this.loadBooks();
        this.selectedBook = null; // close modal after update
      });
    }
  }

  showModal(book: Book) {
    // shows the modal with book details
    this.selectedBook = book;
  }
}
