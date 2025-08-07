import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { BonusScreenComponent } from './components/bonus-screen/bonus-screen.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'spin8s', component: GamePageComponent },
  { path: 'spin8s/bonus', component: BonusScreenComponent },
  { path: '**', redirectTo: '' }
];
