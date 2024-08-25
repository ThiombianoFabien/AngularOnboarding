import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

const features: any[] = [
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatDividerModule,
  MatButtonModule,
  MatTableModule,
];

@NgModule({
  imports: [features],
  exports: [features],
})
export class MaterialFeatures {}
