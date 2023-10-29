import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbairaqComponent } from './albairaq.component';

describe('AlbairaqComponent', () => {
  let component: AlbairaqComponent;
  let fixture: ComponentFixture<AlbairaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbairaqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbairaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
