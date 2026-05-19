import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService, BalanceData } from '../../services/banking.service';
import { AccountSelectionService } from '../../services/account-selection.service';

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

  constructor(
    private bankingService: BankingService,
    public accountSelection: AccountSelectionService
  ) {}

  get accountId(): number | null {
    return this.accountSelection.selectedAccountId();
  }

  ngOnInit() {
    if (this.accountId !== null) {
      this.loadBalance();
    } else {
      this.loading = false;
    }
  }

  loadBalance() {
    if (this.accountId === null) {
      return;
    }

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
