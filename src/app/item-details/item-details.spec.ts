import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDetailsComponent } from './item-details';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DataService } from '../../shared/services/data.service';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map([['id', '1']]) } } },

        { provide: DataService, useValue: { getItemById: () => of({ id: 1, name: 'Test', description: 'Mock desc', technology: 'Angular', author: 'Dev', createdAt: new Date() }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
