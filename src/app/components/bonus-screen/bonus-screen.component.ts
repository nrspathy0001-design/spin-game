import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule, DecimalPipe } from '@angular/common';
import { GameService, WheelSlice } from '../../services/game.service';

@Component({
  selector: 'app-bonus-screen',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './bonus-screen.component.html',
  styleUrls: ['./bonus-screen.component.scss']
})
export class BonusScreenComponent implements OnInit, OnDestroy {
  creditBalance: number = 10000;
  isSpinning: boolean = false;
  spinResult: WheelSlice | null = null;
  wheelRotation: number = 0;
  showResult: boolean = false;
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

  spinWheel(): void {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.showResult = false;
    this.spinResult = null;

    // Generate random spins (3-5 full rotations + final position)
    const spins = 3 + Math.floor(Math.random() * 3);
    const finalRotation = Math.random() * 360;
    const totalRotation = spins * 360 + finalRotation;

    // Animate wheel rotation
    this.wheelRotation = totalRotation;

    // Get spin result
    const result = this.gameService.spinWheel();
    this.spinResult = result.slice;

    // Show result after animation
    setTimeout(() => {
      this.isSpinning = false;
      this.showResult = true;
      this.gameService.addCredits(this.spinResult!.credits);
    }, 3000);
  }

  spinAgain(): void {
    this.showResult = false;
    this.spinResult = null;
  }

  goBack(): void {
    this.router.navigate(['/spin8s']);
  }

  getWheelSlices(): WheelSlice[] {
    return this.gameService.getWheelSlices();
  }
} 