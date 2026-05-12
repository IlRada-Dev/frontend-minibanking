import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService, BalanceData } from '../../services/banking.service';

@Component({
  selector: 'app-balance',
  imports: [CommonModule],
  templateUrl: './balance.html',
  styleUrl: './balance.css',
})
export class Balance implements OnInit {
  balance: BalanceData | null = null;
  loading = true;
  error: string | null = null;
  accountId = 1; // TODO: Make this configurable

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.loadBalance();
  }

  loadBalance() {
    this.loading = true;
    this.error = null;
    this.bankingService.getBalance(this.accountId).subscribe({
      next: (balance) => {
        this.balance = balance;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load balance';
        this.loading = false;
        console.error('Error loading balance:', err);
      }
    });
  }
}
