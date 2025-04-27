import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../modelo/vehiculo';
import { VehiculoService } from './vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  standalone: false,
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css'],
})
export class VehiculoComponent implements OnInit {
  vehiculos: Array<Vehiculo> = [];

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit() {
    this.getVehiculos();
  }

  getVehiculos() {
    this.vehiculoService.getVehiculos().subscribe((vehiculos) => {
      this.vehiculos = vehiculos;
    });
  }

  getMarcas(): string[] {
    return Array.from(new Set(this.vehiculos.map((v) => v.marca)));
  }
  
  getVehiculosPorMarca(): { [marca: string]: number } {
    const conteo: { [marca: string]: number } = {};
    this.vehiculos.forEach((v) => {
      conteo[v.marca] = (conteo[v.marca] || 0) + 1;
    });
    return conteo;
  }
}
