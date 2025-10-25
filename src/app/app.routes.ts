import { Routes } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list';
import { ItemDetailsComponent } from './item-details/item-details';
import { ItemFormComponent } from './item-form/item-form';

export const routes: Routes = [
  { path: 'items', component: ItemsListComponent },
  { path: 'items/new', component: ItemFormComponent },
  { path: 'items/edit/:id', component: ItemFormComponent },
  { path: 'items/:id', component: ItemDetailsComponent },
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: '**', redirectTo: '/items' }
];
