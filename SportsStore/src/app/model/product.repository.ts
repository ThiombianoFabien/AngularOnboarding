import { computed, Injectable, signal, Signal } from '@angular/core';
import { Product } from './product.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class ProductRepository {
  // products: Signal<Product[]>;
  products = signal<Product[]>([]);
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
    // this.products = toSignal(dataSource.products, {
    //   initialValue: [],
    // });

    dataSource.products.subscribe((data) => {
      this.products.set(data);
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

  saveProduct(product: Product) {
    if (product.id == null || product.id == 0) {
      this.dataSource.saveProduct(product).subscribe((p) => {
        this.products.mutate((pdata) => pdata.push(p));
      });
    } else {
      this.dataSource.updateProduct(product).subscribe((p) => {
        this.products.mutate((pdata) =>
          pdata.splice(
            pdata.findIndex((p) => p.id == product.id),
            1,
            product
          )
        );
      });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe((p) => {
      this.products.mutate((pdata) => {
        pdata.splice(
          pdata.findIndex((p) => p.id == id),
          1
        );
      });
    });
  }
}
