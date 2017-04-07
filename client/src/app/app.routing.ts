import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';

import { JobListComponent } from './job-list/job-list.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: JobListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
]

export const routing = RouterModule.forRoot(appRoutes);
