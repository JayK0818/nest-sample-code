import { Subject, from } from 'rxjs';

const subject = new Subject();
subject.subscribe({
  next: (v) => {
    console.log('observerA:', v);
  },
});
subject.subscribe({
  next: (v) => {
    console.log('observerB:', v);
  },
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => {
    console.log('observerC:', v);
  },
});
/**
 * observerA: 1
  observerB: 1
  observerA: 2
  observerB: 2
*/

// ------------------- subject作为 observable ------------------
const subject1 = new Subject();
subject1.subscribe({
  next: (v) => {
    console.log(v);
  },
});
subject1.subscribe({
  next: (v) => {
    console.log(v);
  },
});
const observable = from([1, 2, 3]);
observable.subscribe(subject1);
/**
 *  1
    1
    2
    2
    3
    3
 * 
*/
