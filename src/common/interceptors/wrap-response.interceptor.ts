import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => ({ data })));
  }
  // intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  //   return next.handle().pipe(
  //     map((responseData) => {
  //       // Check for null, undefined, empty objects, empty arrays, or empty strings
  //       if (
  //         responseData === null ||
  //         responseData === undefined ||
  //         (typeof responseData === 'object' && 
  //          !Array.isArray(responseData) && 
  //          Object.keys(responseData).length === 0) ||
  //         (Array.isArray(responseData) && responseData.length === 0) ||
  //         responseData === ''
  //       ) {
  //         return { data: null };
  //       }
  //       return { data: responseData };
  //     })
  //   );
  // }
}
