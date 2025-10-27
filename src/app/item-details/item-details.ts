import { Component, OnInit } from '@angular/core';
import { NgIf, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Project } from '../../shared/models/project.model';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [NgIf, DatePipe, RouterLink],
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.css']
})
export class ItemDetailsComponent implements OnInit {
  project?: Project;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : 0;

    if (!id || isNaN(id)) {
      alert('Некоректний ідентифікатор.');
      this.isLoading = false;
      return;
    }

    this.dataService.getItemById(id).subscribe({
      next: item => {
        this.project = item;
        this.isLoading = false;
      },
      error: () => {
        alert('Елемент не знайдено або видалено.');
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/items']);
  }
}
