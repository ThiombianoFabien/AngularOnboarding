import { Component, Signal, computed, signal } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';

@Component({
  selector: 'store',
  templateUrl: 'store.component.html',
})
export class StoreComponent {
  products: Signal<Product[]>;
  categories: Signal<string[]>;
  selectedCategory = signal<string | undefined>(undefined);
  productsPerPage = signal(4);
  selectedPage = signal(1);
  pagedProducts: Signal<Product[]>;
  pageNumbers: Signal<number[]>;

  constructor(private repository: ProductRepository) {
    // this.products = this.repository.products;
    this.products = computed(() => {
      if (this.selectedCategory() == undefined) {
        return this.repository.products();
      } else {
        return this.repository
          .products()
          .filter((p) => p.category === this.selectedCategory());
      }
    });
    this.categories = this.repository.categories;

    // starting index for current page products
    let pageIndex = computed(() => {
      return (this.selectedPage() - 1) * this.productsPerPage(); // 4-1 = 3 * 4 = 12
    });

    // products to be shown per current page
    this.pagedProducts = computed(() => {
      return this.products().slice(
        pageIndex(),
        pageIndex() + this.productsPerPage()
      ); // - 12 + 4
    });

    this.pageNumbers = computed(() => {
      return Array(Math.ceil(this.products().length / this.productsPerPage()))
        .fill(0)
        .map((x, i) => i + 1);
    });
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory.set(newCategory);
  }

  changePage(newPage: number) {
    this.selectedPage.set(newPage);
  }

  changePageSize(newSize: number) {
    this.productsPerPage.set(newSize);
    this.changePage(1);
  }
}
