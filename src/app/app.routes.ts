import {Routes} from '@angular/router';
import {AuthRouting} from "./pages/auth/routing";
import {MainComponent} from "./pages/main/main.component";
import {reReauth} from "./pages/main/guards/re-reauth";


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate:[reReauth]
  },
  ...AuthRouting
];
