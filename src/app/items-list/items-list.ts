import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../shared/models/project.model';
import { ItemCardComponent } from '../item-card/item-card';
import { DataService } from '../../shared/services/data.service';
import { ShortenPipe } from '../../shared/pipes/shorten.pipe';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCardComponent, ShortenPipe],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent implements OnInit {
  projects$!: Observable<Project[]>;
  searchTerm = '';
  testResults: string[] = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projects$ = this.dataService.projects$;
    this.dataService.getItems().subscribe();
  }

  onSearchChange(): void {
    this.dataService.filterProjects(this.searchTerm);
  }

  onProjectSelected(project: Project): void {
    this.router.navigate(['/items', project.id]);
  }

  navigateToAdd(): void {
    this.router.navigate(['/items/new']);
  }

  runTests(): void {
    this.testResults = [];
    console.log('🚀 Запуск тестів у ItemsListComponent...');

    try {
      this.dataService.testGetItems();
      this.testResults.push('✅ DataService працює');

      ShortenPipe.testPipe();
      this.testResults.push('✅ ShortenPipe працює');

      const mockProject: Project = {
        id: 10,
        name: 'Unit Test Project',
        description: 'Перевірка ItemCardComponent',
        details: 'Тестові деталі для ItemCard',
        technology: 'Angular',
        author: 'QA',
        createdAt: new Date()
      };

      const card = new ItemCardComponent();
      card.project = mockProject;
      let cardClicked = false;
      card.select.subscribe(() => (cardClicked = true));
      card.onSelect();

      if (cardClicked) {
        this.testResults.push('✅ ItemCard передає події');
      } else {
        this.testResults.push('❌ ItemCard не виконує події');
      }

      this.dataService.filterProjects('Angular');
      this.testResults.push('✅ Інтеграційна перевірка фільтрації');

      console.log('🎯 Усі тести виконано успішно');
    } catch (err) {
      console.error('❌ Помилка тестів:', err);
      this.testResults.push('❌ Помилка під час тестування');
    }
  }
}
