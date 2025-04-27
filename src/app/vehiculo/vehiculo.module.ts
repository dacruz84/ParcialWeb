import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculoComponent } from './vehiculo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VehiculoComponent],
  exports: [VehiculoComponent]
})
export class VehiculoModule { }
