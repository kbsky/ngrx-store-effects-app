import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';

import * as toppingsActions from '../actions/toppings.action';
import * as fromService from '../../services';

@Injectable()
export class ToppingsEffects {
	constructor(
		private actions$: Actions,
		private toppingsService: fromService.ToppingsService
	) {}

	@Effect()
	loadToppings$ = this.actions$
		.ofType(toppingsActions.LOAD_TOPPINGS)
		.switchMap(() => {
			return this.toppingsService
				.getToppings()
				.pipe(
					map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
					catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
				)
			}
		)
}