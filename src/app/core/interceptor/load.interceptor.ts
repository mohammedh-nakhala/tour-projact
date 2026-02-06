import { inject } from '@angular/core';
import { BusyService } from './../services/busy.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const loadInterceptor: HttpInterceptorFn = (req, next) => {
  const BusyServ = inject(BusyService);
  BusyServ.busy();
  return next(req).pipe(finalize(()=>BusyServ.hide()));


};
