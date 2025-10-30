import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';
import { ItemCardComponent } from './item-card/item-card';
import { Project } from '../shared/models/project.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ShortenPipe, ItemCardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'My Angular App';
  testResults: string[] = [];

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    console.log('▶ Ініціалізація AppComponent');
  }

  runAllTests(): void {
    this.testResults = [];

    try {
      this.dataService.testGetItems();

      const mockProject: Project = {
        id: 1,
        name: 'E2E Project',
        description: 'Повний тест компонентів',
        details: 'Це демонстраційні дані для тестування',
        technology: 'Angular',
        author: 'Tester',
        createdAt: new Date()
      };

      const card = new ItemCardComponent();
      card.project = mockProject;
      card.select.subscribe(() => {
        console.log('✅ ItemCard передає дані при кліку');
      });
      card.onSelect();

      this.router.navigate(['/items', mockProject.id]);
      console.log('✅ Інтеграційний тест пройшов');
    } catch (err) {
      console.error('❌ Помилка під час тестування:', err);
    }
  }
}
