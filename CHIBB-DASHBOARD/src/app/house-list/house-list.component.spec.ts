/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HouseListComponent } from './house-list.component';

describe('HouseListComponent', () => {
  let component: HouseListComponent;
  let fixture: ComponentFixture<HouseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
