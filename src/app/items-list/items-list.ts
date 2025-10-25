import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../shared/models/project.model';
import { ItemCardComponent } from '../item-card/item-card';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCardComponent],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent {
  projects$!: Observable<Project[]>;
  searchTerm = '';

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
    console.log('Вибраний проект:', project);

  }
  navigateToAdd(): void {
    this.router.navigate(['/items/new']);
  }
}
