import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Vehiculo } from '../modelo/vehiculo';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private apiUrl = environment.baseUrl + '202212_MISW4104_Grupo1.json';

  constructor(private http: HttpClient) {}

  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.apiUrl);
  }
}
