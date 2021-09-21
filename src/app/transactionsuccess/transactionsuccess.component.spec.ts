import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsuccessComponent } from './transactionsuccess.component';

describe('TransactionsuccessComponent', () => {
  let component: TransactionsuccessComponent;
  let fixture: ComponentFixture<TransactionsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
