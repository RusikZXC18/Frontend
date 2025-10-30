import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000';
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public projects$ = this.projectsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getItems(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`).pipe(
      tap(projects => this.projectsSubject.next([...projects])),
      catchError(error => {
        console.error('Помилка при отриманні проєктів:', error);
        return throwError(() => new Error('Не вдалося завантажити проєкти'));
      })
    );
  }

  getItemById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects/${id}`).pipe(
      catchError(error => {
        console.error('Помилка при отриманні проєкту за ID:', error);
        return throwError(() => new Error('Не вдалося знайти проєкт'));
      })
    );
  }

  filterProjects(searchTerm: string): void {
    const query = searchTerm.trim().toLowerCase();
    const current = this.projectsSubject.getValue();
    const filtered = query
      ? current.filter(p => p.name.toLowerCase().includes(query))
      : current;

    this.projectsSubject.next(filtered);
  }

  testGetItems(): void {
    console.log('▶ Тестування DataService...');

    const mockProjects: Project[] = [
      {
        id: 1,
        name: 'TestProj',
        description: 'Mock',
        details: 'Демо-проєкт для тесту DataService',
        technology: 'Angular',
        author: 'User',
        createdAt: new Date()
      }
    ];

    this.projectsSubject.next(mockProjects);
    const current = this.projectsSubject.getValue();

    if (current.length === 1 && current[0].name === 'TestProj') {
      console.log('✅ getItems() працює правильно');
    } else {
      console.error('❌ Помилка в getItems()');
    }
  }
}
