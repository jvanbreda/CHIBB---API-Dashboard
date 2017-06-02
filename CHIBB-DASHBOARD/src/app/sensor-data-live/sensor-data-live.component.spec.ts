/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SensorDataLiveComponent } from './sensor-data-live.component';

describe('SensorDataLiveComponent', () => {
  let component: SensorDataLiveComponent;
  let fixture: ComponentFixture<SensorDataLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorDataLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDataLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
