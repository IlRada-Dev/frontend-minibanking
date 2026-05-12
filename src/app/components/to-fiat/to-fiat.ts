import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingService, Conversion } from '../../services/banking.service';

@Component({
  selector: 'app-to-fiat',
  imports: [CommonModule, FormsModule],
  templateUrl: './to-fiat.html',
  styleUrl: './to-fiat.css',
})
export class ToFiat {
  accountId = 1; // TODO: Make this configurable
  toCurrency = 'USD';
  conversion: Conversion | null = null;
  loading = false;
  error: string | null = null;

  constructor(private bankingService: BankingService) {}

  onSubmit() {
    if (!this.toCurrency.trim()) {
      this.error = 'Please enter a target currency';
      return;
    }

    this.loading = true;
    this.error = null;
    this.conversion = null;

    this.bankingService.convertFiat(this.accountId, this.toCurrency.trim()).subscribe({
      next: (conversion) => {
        this.conversion = conversion;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to convert balance';
        this.loading = false;
        console.error('Error converting balance:', err);
      }
    });
  }
}
