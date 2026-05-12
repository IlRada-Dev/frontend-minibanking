import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Withdrawl } from './withdrawl';

describe('Withdrawl', () => {
  let component: Withdrawl;
  let fixture: ComponentFixture<Withdrawl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Withdrawl],
    }).compileComponents();

    fixture = TestBed.createComponent(Withdrawl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
