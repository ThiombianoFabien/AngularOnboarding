import { Injectable } from '@angular/core';
import { StaticDataSource } from './static.dataSource';
import { Order } from './order.model';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.dataSource';

@Injectable()
export class OrderRepository {
  // constructor(private dataSource: StaticDataSource) {}
  constructor(private dataSource: RestDataSource) {}

  saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }
}
