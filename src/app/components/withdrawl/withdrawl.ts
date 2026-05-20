import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingService, Transaction } from '../../services/banking.service';
import { AccountSelectionService } from '../../services/account-selection.service';

@Component({
  selector: 'app-withdrawl',
  imports: [CommonModule, FormsModule],
  templateUrl: './withdrawl.html',
  styleUrl: './withdrawl.css',
})
export class Withdrawl {
  amount: number | null = null;
  description = '';
  loading = false;
  error: string | null = null;
  success: Transaction | null = null;

  constructor(
    private bankingService: BankingService,
    public accountSelection: AccountSelectionService,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef
  ) {}

  get accountId(): number | null {
    return this.accountSelection.selectedAccountId();
  }

  onSubmit() {
    if (this.accountId === null) {
      this.error = 'Please select an account first';
      return;
    }

    if (this.amount === null || this.amount <= 0 || !this.description.trim()) {
      this.error = 'Please enter a valid amount and description';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    this.bankingService.withdraw(this.accountId, this.amount, this.description.trim()).subscribe({
      next: (transaction) => {
        this.ngZone.run(() => {
          this.success = transaction;
          this.loading = false;
          this.amount = null;
          this.description = '';
          this.cd.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.error = 'Failed to make withdrawal';
          this.loading = false;
          this.cd.detectChanges();
        });
        console.error('Error making withdrawal:', err);
      }
    });
  }
}
