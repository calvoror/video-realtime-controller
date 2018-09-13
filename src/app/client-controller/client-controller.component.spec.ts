import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientControllerComponent } from './client-controller.component';

describe('ClientControllerComponent', () => {
  let component: ClientControllerComponent;
  let fixture: ComponentFixture<ClientControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
