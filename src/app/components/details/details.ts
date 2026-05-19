import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService, Transaction } from '../../services/banking.service';
import { AccountSelectionService } from '../../services/account-selection.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  transactions: Transaction[] = [];
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
      this.loadTransactions();
    } else {
      this.loading = false;
    }
  }

  loadTransactions() {
    if (this.accountId === null) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.bankingService.getTransactions(this.accountId).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load transactions';
        this.loading = false;
        console.error('Error loading transactions:', err);
      }
    });
  }
}
