/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HouseComponent } from './house.component';

describe('HouseComponent', () => {
  let component: HouseComponent;
  let fixture: ComponentFixture<HouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
