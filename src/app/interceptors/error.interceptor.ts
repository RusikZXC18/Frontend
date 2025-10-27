import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

const BASE_URL = 'http://localhost:3000';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.url.startsWith('http')
    ? req
    : req.clone({ url: `${BASE_URL}${req.url}` });

  return next(apiReq).pipe(
    catchError(error => {
      console.error('HTTP Error:', error);

      let errorMessage = 'Сталася невідома помилка. Спробуйте пізніше.';
      if (error.status === 0) {
        errorMessage = 'Немає зв’язку із сервером.';
      } else if (error.status >= 400 && error.status < 500) {
        errorMessage = 'Помилка клієнта: перевірте введені дані.';
      } else if (error.status >= 500) {
        errorMessage = 'Помилка сервера. Спробуйте пізніше.';
      }

      alert(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
