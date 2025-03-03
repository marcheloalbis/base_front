import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionAddComponent } from './opcion-add.component';

describe('OpcionAddComponent', () => {
  let component: OpcionAddComponent;
  let fixture: ComponentFixture<OpcionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
