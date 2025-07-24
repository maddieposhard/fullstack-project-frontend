import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-new',
  imports: [ReactiveFormsModule],
  templateUrl: './book-new.component.html',
  styleUrl: './book-new.component.css'
})
export class BookNewComponent {
  bookForm = new FormGroup({
    title: new FormControl<string> ('', { validators: [Validators.required], nonNullable: true }),
    author: new FormControl<string> ('', { validators: [Validators.required], nonNullable: true }),
    read: new FormControl<boolean> (false, { nonNullable: true })
  });

  constructor(private bookService: BookService, private router: Router) { }

  onSubmit() {
    this.bookService.createBook(this.bookForm.value).subscribe({
      next: (book: Book) => {
        console.log('Book created:', book);
        this.router.navigate(['/books']);
      },
      error: (error: any) => {
        console.error('Error creating book', error);
      }
    });
  }
}
