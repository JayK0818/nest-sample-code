import { Observable } from 'rxjs'

const observable = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
    subscriber.complete()
  }, 1000)
})
console.log('just before subscribe')
observable.subscribe({
  next(x) {
    console.log('got value:', x)
  },
  complete() {
    console.log('done')
  }
})
console.log('just after subscribe')

/**
 * just before subscribe
    got value: 1
    got value: 2
    got value: 3
    just after subscribe
    got value: 4
  done
 * 
*/

console.log('--------------------------------------')
/**
 * Both function and Observables are lazy computations. If you do not call the function, the *console.log()* will not happen.
*/
function foo () {
  console.log('Hello')
  return 42
}
const x = foo.call(null)
console.log('x:', x)

const y = foo.call(null)
console.log('y:', y)

console.log('subscriber before')
const observable_foo = new Observable(subscriber => {
  console.log('hello subscriber')
  subscriber.next(50)
  // complete 之后的 next() 不会再执行了
  subscriber.complete()
  subscriber.next(100)
})

observable_foo.subscribe(x => {
  console.log(x)
})
observable_foo.subscribe(y => {
  console.log(y)
})

observable_foo.subscribe({
  next (x) {
    console.log('对象:', x)
  },
  complete() {
    console.log('complete11111111')
  }
})
console.log('subscriber after')
