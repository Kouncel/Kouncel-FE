import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { RouterModule, Routes } from '@angular/router';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { FormsModule } from '@angular/forms';
import { ProfessionsComponent } from './professions/professions.component';


const routes: Routes = [
  { component: AdministrationComponent, path: 'admin' },
  { component: EditHeaderComponent, path: 'admin/edit-header' },
  { component: ProfessionsComponent, path: 'admin/professions' },
];

@NgModule({
  declarations: [
    AdministrationComponent,
    EditHeaderComponent,
    ProfessionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true
    }),
  ]
})
export class AdministrationModule { }
