import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WheelSlice {
  credits: number;
  weight: number;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private creditBalance = new BehaviorSubject<number>(10000);
  public creditBalance$ = this.creditBalance.asObservable();

  private readonly wheelSlices: WheelSlice[] = [
    { credits: 5000, weight: 4, color: '#FFD700' },
    { credits: 200, weight: 100, color: '#FF6B6B' },
    { credits: 1000, weight: 20, color: '#4ECDC4' },
    { credits: 400, weight: 50, color: '#45B7D1' },
    { credits: 2000, weight: 10, color: '#96CEB4' },
    { credits: 200, weight: 100, color: '#FFEAA7' },
    { credits: 1000, weight: 20, color: '#DDA0DD' },
    { credits: 400, weight: 50, color: '#98D8C8' }
  ];

  constructor() {}

  getCreditBalance(): number {
    return this.creditBalance.value;
  }

  updateCreditBalance(amount: number): void {
    this.creditBalance.next(amount);
  }

  addCredits(amount: number): void {
    const currentBalance = this.creditBalance.value;
    this.creditBalance.next(currentBalance + amount);
  }

  getWheelSlices(): WheelSlice[] {
    return this.wheelSlices;
  }

  spinWheel(): { slice: WheelSlice; index: number } {
    // Calculate total weight
    const totalWeight = this.wheelSlices.reduce((sum, slice) => sum + slice.weight, 0);
    
    // Generate random number
    const random = Math.random() * totalWeight;
    
    // Find the selected slice based on weight
    let currentWeight = 0;
    for (let i = 0; i < this.wheelSlices.length; i++) {
      currentWeight += this.wheelSlices[i].weight;
      if (random <= currentWeight) {
        return { slice: this.wheelSlices[i], index: i };
      }
    }
    
    // Fallback to last slice
    return { slice: this.wheelSlices[this.wheelSlices.length - 1], index: this.wheelSlices.length - 1 };
  }

  calculateWheelAngle(sliceIndex: number): number {
    // Each slice is 45 degrees (360 / 8)
    return sliceIndex * 45;
  }

  getWheelCenterPosition(): { x: number; y: number } {
    return { x: 400, y: 300 };
  }
} 