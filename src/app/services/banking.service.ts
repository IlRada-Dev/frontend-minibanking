import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Account {
  id: number;
  tax_id: string;
  owner_name: string;
  created_at: string;
  currency: string;
}

export interface Currency {
  id: number;
  name: string;
}

export interface Transaction {
  id: number;
  id_account: number;
  type: string;
  amount: number;
  description: string;
  created_at: string;
  balance_after: number;
}

export interface BalanceData {
  id_account: number;
  currency: string;
  balance: number;
}

export interface Conversion {
  id_account: number;
  provider: string;
  conversion_type: string;
  from_currency: string;
  to_currency: string;
  original_balance: number;
  converted_balance: number;
  rate: number;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BankingService {
  private baseUrl = 'http://localhost:4200/api';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/account`);
  }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.baseUrl}/currency`);
  }

  getTransactionsSummary(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/trans`);
  }

  getBalance(accountId: number): Observable<BalanceData> {
    return this.http.get<BalanceData>(`${this.baseUrl}/account/${accountId}/balance`);
  }

  convertFiat(accountId: number, to: string): Observable<Conversion> {
    return this.http.get<Conversion>(`${this.baseUrl}/account/${accountId}/balance/convert/fiat?to=${to}`);
  }

  convertCrypto(accountId: number, to: string): Observable<Conversion> {
    return this.http.get<Conversion>(`${this.baseUrl}/account/${accountId}/balance/convert/crypto?to=${to}`);
  }

  getTransactions(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/account/${accountId}/transaction`);
  }

  getTransaction(accountId: number, transactionId: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/account/${accountId}/transaction/${transactionId}`);
  }

  deposit(accountId: number, amount: number, description: string): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/account/${accountId}/deposit`, { amount, description });
  }

  withdraw(accountId: number, amount: number, description: string): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/account/${accountId}/withdrawal`, { amount, description });
  }

  editDescription(accountId: number, transactionId: number, description: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/account/${accountId}/transaction/${transactionId}`, { description });
  }

  deleteTransaction(accountId: number, transactionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/account/${accountId}/transaction/${transactionId}`);
  }
}