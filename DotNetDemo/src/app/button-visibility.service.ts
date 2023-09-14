import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonVisibilityService {
  constructor() { }
  private _isVisible = new BehaviorSubject<boolean>(false);
  isVisible$ = this._isVisible.asObservable();

  setVisibility(isVisible: boolean) {
    this._isVisible.next(isVisible);
  }
}
