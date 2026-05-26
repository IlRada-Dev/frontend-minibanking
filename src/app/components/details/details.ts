import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
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
    public accountSelection: AccountSelectionService,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef
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
        this.ngZone.run(() => {
          this.transactions = transactions.sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          this.loading = false;
          this.cd.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.error = 'Failed to load transactions';
          this.loading = false;
          this.cd.detectChanges();
        });
        console.error('Error loading transactions:', err);
      }
    });
  }
}
