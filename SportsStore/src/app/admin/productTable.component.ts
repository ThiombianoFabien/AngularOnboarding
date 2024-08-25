import { Component, IterableDiffer, IterableDiffers } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';

@Component({
  templateUrl: 'productTable.component.html',
})
export class ProductTableComponent {
  colsAndRows = ['id', 'name', 'category', 'price', 'buttons'];
  dataSource = new MatTableDataSource(this.repository.products());
  differ: IterableDiffer<Product>;

  constructor(private repository: ProductRepository, differs: IterableDiffers) {
    this.differ = differs.find(this.repository.products()).create();
  }
  ngDoCheck() {
    let changes = this.differ?.diff(this.repository.products());
    if (changes != null) {
      this.dataSource.data = this.repository.products();
    }
  }

  deleteProduct(id: number) {
    this.repository.deleteProduct(id);
  }
}
