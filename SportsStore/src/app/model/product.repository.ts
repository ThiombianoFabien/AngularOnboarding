import { computed, Injectable, Signal } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSource } from './static.dataSource';
import { RestDataSource } from './rest.dataSource';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class ProductRepository {
  products: Signal<Product[]>;
  categories: Signal<string[]>;

  // constructor(private dataSource: StaticDataSource) {
  //   this.products = dataSource.products;
  //   this.categories = computed(() => {
  //     return this.dataSource
  //       .products()
  //       .map((p) => p.category ?? 'None')
  //       .filter((c, index, array) => array.indexOf(c) == index)
  //       .sort();
  //   });
  // }

  constructor(private dataSource: RestDataSource) {
    this.products = toSignal(dataSource.products, {
      initialValue: [],
    });
    this.categories = computed(() => {
      return this.products()
        .map((p) => p.category ?? 'None')
        .filter((c, index, array) => array.indexOf(c) == index)
        .sort();
    });
  }

  getProduct(id: number): Product | undefined {
    return this.products().find((p) => p.id == id);
  }
}
