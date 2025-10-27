import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Project } from '../../shared/models/project.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-form.html',
  styleUrls: ['./item-form.css']
})
export class ItemFormComponent {
  projectForm!: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required, Validators.minLength(10)]),
      technology: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.projectForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.projectForm.invalid) return;

    const newProject: Project = {
      id: Math.floor(Math.random() * 10000),
      ...this.projectForm.value,
      createdAt: new Date()
    };


    setTimeout(() => this.router.navigate(['/items']), 1000);
  }
}
