import { concat, interval, take, range, race, map, zip, of } from 'rxjs';

const timer = interval(1000).pipe(take(4));
const sequence = range(1, 10);

concat(timer, sequence).subscribe((x) => {
  console.log(x); // 0 1 2 3 (间隔1s)输出, 然后输出1-10
});

concat(
  interval(1000).pipe(take(10)),
  interval(2000).pipe(take(3)),
  interval(500).pipe(take(5)),
).subscribe((x) => {
  console.log(x);
});

// ----------------------- race -------------------
race(
  interval(7000).pipe(map(() => 'slow one')),
  interval(3000).pipe(map(() => 'fast one')),
  interval(5000).pipe(map(() => 'medium one')),
).subscribe((winner) => {
  console.log(winner);
});
// a series of 'fast one'

// ------------------- zip ------------------------
const list: any[] = [];
zip(of(10, 20, 30), of('Foo', 'Bar', 'Beer'), of(true, false, true))
  .pipe(map(([age, name, isDev]) => ({ age, name, isDev })))
  .subscribe((x) => {
    console.log('zip:', x);
    list.push(x);
    /**
     * zip: { age: 10, name: 'Foo', isDev: true }
      zip: { age: 20, name: 'Bar', isDev: false }
      zip: { age: 30, name: 'Beer', isDev: true }
    */
  });
console.log('list:', list);
