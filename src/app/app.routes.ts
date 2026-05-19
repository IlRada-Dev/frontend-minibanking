import { Routes } from '@angular/router';
import { List } from './components/list/list';
import { Balance } from './components/balance/balance';
import { Deposit } from './components/deposit/deposit';
import { Withdrawl } from './components/withdrawl/withdrawl';
import { Details } from './components/details/details';
import { ToFiat } from './components/to-fiat/to-fiat';
import { ToCrypto } from './components/to-crypto/to-crypto';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'accounts', component: List },
  { path: 'balance', component: Balance },
  { path: 'deposit', component: Deposit },
  { path: 'withdraw', component: Withdrawl },
  { path: 'details', component: Details },
  { path: 'to-fiat', component: ToFiat },
  { path: 'to-crypto', component: ToCrypto },
];
