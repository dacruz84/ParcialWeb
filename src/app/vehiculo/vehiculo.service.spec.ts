import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from '../modelo/vehiculo';

describe('VehiculoService', () => {
  let service: VehiculoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiculoService],
    });

    service = TestBed.inject(VehiculoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch vehiculos as an Observable', () => {
    const mockVehiculos: Vehiculo[] = [
      {
        id: 1,
        marca: 'Renault',
        linea: 'Kangoo',
        modelo: 2017,
        referencia: 'VU Express',
        kilometraje: 93272,
        color: 'Blanco',
        imagen:
          'https://cdn.group.renault.com/ren/co/vehicles/kangoo/home/renault-kangoo-exterior.jpg',
      },
      {
        id: 2,
        marca: 'Chevrolet',
        linea: 'Spark',
        modelo: 2018,
        referencia: 'Life',
        kilometraje: 55926,
        color: 'Plata',
        imagen:
          'https://turistran.com/2-thickbox_default/chevrolet-spark-life.jpg',
      },
    ];

    service.getVehiculos().subscribe((vehiculos) => {
      expect(vehiculos.length).toBe(2);
      expect(vehiculos).toEqual(mockVehiculos);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehiculos);
  });
});
