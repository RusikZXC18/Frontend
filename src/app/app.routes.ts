import { Routes } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list';
import { ItemDetailsComponent } from './item-details/item-details';

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: 'items', component: ItemsListComponent },
  { path: 'items/new', component: ItemDetailsComponent },
  { path: 'items/:id', component: ItemDetailsComponent },
];
