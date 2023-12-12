// import { ajax } from 'rxjs/ajax';
import { map, catchError, of, from, interval, take, range } from 'rxjs';

// ------------------------- ajax --------------------------
/* const $ = ajax('http:/api/v1/player/players_list').pipe(
  map((res) => console.log('res:', res)),
  catchError((err) => {
    console.log('error:', err);
    return of(err);
  }),
); */

/* $.subscribe({
  next: (value) => {
    console.log('ajax-value:', value);
  },
}); */

// ---------------- from ------------------
const array_from = from([1, 2, 3]);
array_from.subscribe((x) => {
  console.log('array:', x); // 1, 2, 3
});

const object_from = from({
  0: 'hello',
  1: 'world',
  2: 'hello world',
  length: 3,
});
object_from.subscribe((x) => {
  console.log('object:', x); // hello, world, hello world
});

/* function foo(a: number, b: number): void {
  console.log(a, b);
  const arguments_from = from(arguments);
  arguments_from.subscribe((x) => {
    console.log('argument:', x); // 1 2
  });
}
foo(1, 2); */

from('hello').subscribe({
  next: (v) => {
    console.log('string:', v);
    // h, e, l, l, o
  },
});

/* const _promise = (s: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(s), 100);
  });
};
from([_promise('hello'), _promise('promise')]).subscribe({
  next: (v) => {
    console.log('promise', v);
  },
}); */

// ---------------- interval ----------
const numbers = interval(1000);
numbers.pipe(take(4)).subscribe((x) => {
  console.log('interval:', x); // 0,1,2,3
});

// ------------------- of -----------------------
of(10, 20, 30).subscribe({
  next: (v) => {
    console.log('off-v:', v); // 10, 20, 30
  },
  complete: () => {
    console.log('off-complete:');
  },
});

of(['hello', 'world', 'hello world']).subscribe({
  next: (v) => {
    console.log('of-array:', v); // [ 'hello', 'world', 'hello world' ]
  },
  complete: () => {
    console.log('complete');
  },
});

of({ 0: '你好', 1: '生活', length: 2 }).subscribe({
  next: (v) => {
    console.log('of-object:', v);
  },
  complete: () => {
    console.log('of-object-complete');
    // { '0': '你好', '1': '生活', length: 2 }
  },
});

// ----------------- from -----------------------
range(10, 5).subscribe({
  next: (v) => {
    console.log('range:', v);
    // 10 11 12 13 14
  },
});
