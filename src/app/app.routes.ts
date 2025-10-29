import { Routes } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list';
import { ItemDetailsComponent } from './item-details/item-details';

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },   // Перенаправлення на список
  { path: 'items', component: ItemsListComponent },        // Список елементів
  { path: 'items/new', component: ItemDetailsComponent },  // Створення нового елемента
  { path: 'items/:id', component: ItemDetailsComponent },  // Перегляд/редагування за ID
  { path: '**', redirectTo: 'items' }                      // Якщо шлях невідомий
];
