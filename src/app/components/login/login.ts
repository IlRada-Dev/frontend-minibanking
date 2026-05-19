import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BankingService, Account } from '../../services/banking.service';
import { AccountSelectionService } from '../../services/account-selection.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html'
})
export class Login implements OnInit {
  accounts: Account[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private bankingService: BankingService,
    private router: Router,
    public accountSelection: AccountSelectionService
  ) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.loading = true;
    this.error = null;
    this.bankingService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load accounts';
        this.loading = false;
        console.error('Error loading accounts:', err);
      }
    });
  }

  selectAccount(accountId: number) {
    this.accountSelection.selectAccount(accountId);
    this.router.navigate(['/balance']);
  }
}
