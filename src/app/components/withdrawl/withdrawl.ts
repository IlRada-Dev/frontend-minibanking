import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingService, Transaction } from '../../services/banking.service';

@Component({
  selector: 'app-withdrawl',
  imports: [CommonModule, FormsModule],
  templateUrl: './withdrawl.html',
  styleUrl: './withdrawl.css',
})
export class Withdrawl {
  accountId = 1; // TODO: Make this configurable
  amount: number | null = null;
  description = '';
  loading = false;
  error: string | null = null;
  success: Transaction | null = null;

  constructor(private bankingService: BankingService) {}

  onSubmit() {
    if (this.amount === null || this.amount <= 0 || !this.description.trim()) {
      this.error = 'Please enter a valid amount and description';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    this.bankingService.withdraw(this.accountId, this.amount, this.description.trim()).subscribe({
      next: (transaction) => {
        this.success = transaction;
        this.loading = false;
        this.amount = null;
        this.description = '';
      },
      error: (err) => {
        this.error = 'Failed to make withdrawal';
        this.loading = false;
        console.error('Error making withdrawal:', err);
      }
    });
  }
}
