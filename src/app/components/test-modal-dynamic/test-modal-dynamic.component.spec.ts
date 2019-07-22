import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModalDynamicComponent } from './test-modal-dynamic.component';

describe('TestModalDynamicComponent', () => {
  let component: TestModalDynamicComponent;
  let fixture: ComponentFixture<TestModalDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestModalDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestModalDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
