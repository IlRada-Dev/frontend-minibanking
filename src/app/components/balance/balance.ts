import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
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
    public accountSelection: AccountSelectionService,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef
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
        this.ngZone.run(() => {
          this.balance = balance;
          this.loading = false;
          this.cd.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.error = 'Failed to load balance';
          this.loading = false;
          this.cd.detectChanges();
        });
        console.error('Error loading balance:', err);
      }
    });
  }
}
