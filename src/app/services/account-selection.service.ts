import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountSelectionService {
  selectedAccountId = signal<number | null>(null);

  selectAccount(accountId: number) {
    this.selectedAccountId.set(accountId);
  }

  clearSelection() {
    this.selectedAccountId.set(null);
  }
}
