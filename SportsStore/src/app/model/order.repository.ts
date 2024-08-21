import { Injectable } from '@angular/core';
import { StaticDataSource } from './static.dataSource';
import { Order } from './order.model';
import { Observable } from 'rxjs';

@Injectable()
export class OrderRepository {
  constructor(private dataSource: StaticDataSource) {}

  saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }
}
