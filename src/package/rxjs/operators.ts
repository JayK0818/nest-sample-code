import { of, map, first } from 'rxjs';

// ------------- map -------------
of(1, 2, 3)
  // set the context and return a pipeable operator
  .pipe(map((x) => x * 3))
  .subscribe((x) => {
    console.log('value: ', x); // 3 6 9
  });

// ------------ first --------------
of(1, 2, 3)
  .pipe(first())
  .subscribe((x) => {
    console.log('first-value:', x); // 1
  });
