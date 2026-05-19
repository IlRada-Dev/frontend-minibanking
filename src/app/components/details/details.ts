import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService, Transaction } from '../../services/banking.service';

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
  accountId = 1; // TODO: Make this configurable

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
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
