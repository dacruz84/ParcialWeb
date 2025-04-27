import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculoComponent } from './vehiculo.component';
import { VehiculoService } from './vehiculo.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Vehiculo } from '../modelo/vehiculo';

describe('VehiculoComponent', () => {
  let component: VehiculoComponent;
  let fixture: ComponentFixture<VehiculoComponent>;
  let mockVehiculoService: jasmine.SpyObj<VehiculoService>;

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
    {
      id: 3,
      marca: 'Renault',
      linea: 'Renault',
      modelo: 2020,
      referencia: 'Other',
      kilometraje: 25000,
      color: 'Negro',
      imagen:
        'https://turistran.com/2-thickbox_default/chevrolet-spark-life.jpg',
    },
  ];

  beforeEach(async () => {
    mockVehiculoService = jasmine.createSpyObj('VehiculoService', [
      'getVehiculos',
    ]);
    mockVehiculoService.getVehiculos.and.returnValue(of(mockVehiculos));

    await TestBed.configureTestingModule({
      declarations: [VehiculoComponent],
      providers: [{ provide: VehiculoService, useValue: mockVehiculoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Dispara la detección de cambios inicial
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getVehiculos on init and populate vehiculos', () => {
    expect(mockVehiculoService.getVehiculos).toHaveBeenCalled();
    expect(component.vehiculos.length).toBe(3);
    expect(component.vehiculos).toEqual(mockVehiculos);
  });

  it('should calculate unique marcas correctly', () => {
    const marcas = component.getMarcas();
    expect(marcas).toEqual(['Renault', 'Chevrolet']);
  });

  it('should calculate vehiculos count per marca correctly', () => {
    const conteo = component.getVehiculosPorMarca();
    expect(conteo).toEqual({ Renault: 2, Chevrolet: 1 });
  });

  it('should render the table with vehiculos data', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);

    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('1');
    expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('Renault');
    expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('Kangoo');
    expect(firstRowCells[3].nativeElement.textContent.trim()).toBe('2017');
  });

  it('should render the table with 3 rows in tbody and 1 thead', () => {
    const table = fixture.debugElement.query(By.css('table'));
    const headerRows = table.queryAll(By.css('thead tr'));
    const bodyRows = table.queryAll(By.css('tbody tr'));

    expect(headerRows.length).toBe(1);
    expect(bodyRows.length).toBe(3);
  });
});
