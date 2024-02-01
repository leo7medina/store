import { Component, signal, inject, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { ProductItemComponent } from '@products/components/product-item/product-item.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductItemComponent, HeaderComponent ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export default class ListProductsComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private productService = inject(ProductService);
  private categorytService = inject(CategoryService);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  @Input() category_id?: string;
  
  ngOnInit() {
    //this.getListProducts();
    this.getListCategories();

  }

  ngOnChanges(changes: SimpleChanges) {
      this.getListProducts()
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getListProducts() {
    this.productService.getProducts(this.category_id).subscribe({
      next: (products) => this.products.set(products),
      error: (err) => console.log(err)
    });
  }
  private getListCategories() {
    this.categorytService.getAll().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (err) => console.log(err)
    });
  }

}
