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
  transaction: Transaction | null = null;
  loading = true;
  error: string | null = null;
  accountId = 1; // TODO: Make this configurable
  transactionId = 1; // TODO: Make this configurable

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.loadTransaction();
  }

  loadTransaction() {
    this.loading = true;
    this.error = null;
    this.bankingService.getTransaction(this.accountId, this.transactionId).subscribe({
      next: (transaction) => {
        this.transaction = transaction;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load transaction';
        this.loading = false;
        console.error('Error loading transaction:', err);
      }
    });
  }
}
