import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ShortenPipe } from '../../shared/pipes/shorten.pipe';
import { HoverHighlightDirective } from '../../shared/directives/hover-highlight.directive';
import { Project } from '../../shared/models/project.model';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        ItemCardComponent
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
  });

  it('should render project name and description', async () => {
    const project: Project = {
      id: 1,
      name: 'Angular Test Project',
      description: 'Testing the ItemCardComponent rendering logic.',
      technology: 'Angular',
      author: 'Dev',
      createdAt: new Date()
    };

    component.project = project;
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h3')?.textContent)
      .toContain('Angular Test Project');
    expect(compiled.querySelector('.description')?.textContent)
      .toContain('Testing the ItemCardComponent');
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('Dev');
  });
});
