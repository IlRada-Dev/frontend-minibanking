import { Component, OnInit } from '@angular/core';
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

  constructor(private bankingService: BankingService) {}

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
}
