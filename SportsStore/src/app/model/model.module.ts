import { NgModule } from '@angular/core';
import { ProductRepository } from './product.repository';
import { StaticDataSource } from './static.dataSource';

@NgModule({
  providers: [ProductRepository, StaticDataSource],
})
export class ModelModule {}
