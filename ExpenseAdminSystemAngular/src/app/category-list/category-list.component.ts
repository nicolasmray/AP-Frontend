import { Component } from '@angular/core';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})

export class CategoryListComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}
    ngOnInit(): void {
      this.categoryService.getCategories().subscribe(listOfCategories=>{
        this.categories = listOfCategories
      }
    )
  }
}
