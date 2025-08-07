import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule, DecimalPipe } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, OnDestroy {
  creditBalance: number = 10000;
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.gameService.creditBalance$.subscribe(balance => {
        this.creditBalance = balance;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  startBonusScreen(): void {
    // Transition to bonus screen
    this.router.navigate(['/spin8s/bonus']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
} 