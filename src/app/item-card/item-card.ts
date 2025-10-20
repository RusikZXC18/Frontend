import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project } from '../../shared/models/project.model';
import { ShortenPipe } from '../../shared/pipes/shorten.pipe';
import { HoverHighlightDirective } from '../../shared/directives/hover-highlight.directive';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ShortenPipe, HoverHighlightDirective],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input() project!: Project;
  @Output() select = new EventEmitter<Project>();

  onSelect(): void {
    this.select.emit(this.project);
  }
}
