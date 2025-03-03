import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesListPage } from './opcion-list.component';

describe('OpcionesListPage', () => {
  let component: OpcionesListPage;
  let fixture: ComponentFixture<OpcionesListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionesListPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
