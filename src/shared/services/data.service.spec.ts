import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Project } from '../models/project.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch items correctly', () => {
    const mockProjects: Project[] = [
      {
        id: 1,
        name: 'Test',
        description: 'desc',
        technology: 'Angular',
        author: 'User',
        createdAt: new Date()
      }
    ];

    service.getItems().subscribe((projects) => {
      expect(projects.length).toBe(1);
      expect(projects[0].name).toBe('Test');
    });

    const req = httpMock.expectOne('http://localhost:3000/projects');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
