import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingService, Conversion } from '../../services/banking.service';
import { AccountSelectionService } from '../../services/account-selection.service';

@Component({
  selector: 'app-to-crypto',
  imports: [CommonModule, FormsModule],
  templateUrl: './to-crypto.html',
  styleUrl: './to-crypto.css',
})
export class ToCrypto {
  toCurrency = 'BTC';
  conversion: Conversion | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private bankingService: BankingService,
    public accountSelection: AccountSelectionService
  ) {}

  get accountId(): number | null {
    return this.accountSelection.selectedAccountId();
  }

  onSubmit() {
    if (this.accountId === null) {
      this.error = 'Please select an account first';
      return;
    }

    if (!this.toCurrency.trim()) {
      this.error = 'Please enter a target currency';
      return;
    }

    this.loading = true;
    this.error = null;
    this.conversion = null;

    this.bankingService.convertCrypto(this.accountId, this.toCurrency.trim()).subscribe({
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
