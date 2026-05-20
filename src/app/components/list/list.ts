import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService, Account } from '../../services/banking.service';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  accounts: Account[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private bankingService: BankingService,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.loading = true;
    this.error = null;
    this.bankingService.getAccounts().subscribe({
      next: (accounts) => {
        this.ngZone.run(() => {
          this.accounts = accounts;
          this.loading = false;
          this.cd.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.error = 'Failed to load accounts';
          this.loading = false;
          this.cd.detectChanges();
        });
        console.error('Error loading accounts:', err);
      }
    });
  }
}
