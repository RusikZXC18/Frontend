import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsListComponent } from './items-list';
import { DataService } from '../../shared/services/data.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('Integration: ItemsList + DataService', () => {
  let fixture: ComponentFixture<ItemsListComponent>;
  let component: ItemsListComponent;

  const mockDataService = {
    projects$: of([
      {
        id: 1,
        name: 'Mock',
        description: 'Desc',
        technology: 'Angular',
        author: 'Tester',
        createdAt: new Date()
      }
    ]),
    getItems: () => of([]),
    filterProjects: jasmine.createSpy('filterProjects')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ItemsListComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render items from service', () => {
    component.projects$.subscribe(projects => {
      expect(projects.length).toBe(1);
      expect(projects[0].name).toBe('Mock');
    });
  });
});
