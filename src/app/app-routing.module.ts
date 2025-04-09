import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PersonagensPageComponent } from './pages/personagens-page/personagens-page.component';
import { PersonagensDetalhesComponent } from './pages/personagens-detalhes/personagens-detalhes.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'personagens', component: PersonagensPageComponent },
    { path: 'personagens/:id', component: PersonagensDetalhesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
