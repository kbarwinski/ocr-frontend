import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendComponent } from './features/send/send.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/landing/landing.module').then((x) => x.LandingModule),
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('./features/upload/upload.module').then((x) => x.UploadModule),
  },
  {
    path: 'stats',
    loadChildren: () =>
      import('./features/stats/stats.module').then((x) => x.StatsModule),
  },
  { path: 'send', component: SendComponent },
  {
    path: 'invoice/:id',
    loadChildren: () =>
      import('./features/details/details.module').then((x) => x.DetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
