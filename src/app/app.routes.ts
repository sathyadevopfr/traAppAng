import { Routes } from '@angular/router';
import { HomeComponent } from './Componennts/home/home.component';
import { SearchComponent } from './Componennts/search/search.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch:'full'
    },
    {
        path: 'home',
        component:HomeComponent
    },
    {
        path: 'search/:fromStationId/:toStationId/:dateOfTravel',
        component:SearchComponent
    }
];
