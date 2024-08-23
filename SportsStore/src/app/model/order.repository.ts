import { Injectable, signal } from '@angular/core';
import { StaticDataSource } from './static.dataSource';
import { Order } from './order.model';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class OrderRepository {
  private ordersSignal = signal<Order[]>([]);
  private loaded: boolean = false;

  // constructor(private dataSource: StaticDataSource) {}
  constructor(private dataSource: RestDataSource) {}

  // saveOrder(order: Order): Observable<Order> {
  //   return this.dataSource.saveOrder(order);
  // }

  saveOrder(order: Order): Observable<Order> {
    this.loaded = false;
    return this.dataSource.saveOrder(order);
  }

  loadOrders() {
    this.loaded = true;
    this.dataSource
      .getOrders()
      .subscribe((data) => this.ordersSignal.set(data));
  }

  updateOrder(order: Order) {
    this.dataSource.updateOrder(order).subscribe((order) =>
      this.ordersSignal.mutate((orders) => {
        orders.splice(
          orders.findIndex((o) => o.id == order.id),
          1,
          order
        );
      })
    );
  }

  deleteOrder(id: number) {
    this.dataSource.deleteOrder(id).subscribe((order) =>
      this.ordersSignal.mutate((orders) => {
        orders.splice(
          orders.findIndex((o) => o.id == order.id),
          1
        );
      })
    );
  }

  get orders() {
    if (!this.loaded) {
      this.loadOrders();
    }
    return this.ordersSignal.asReadonly();
  }
}
