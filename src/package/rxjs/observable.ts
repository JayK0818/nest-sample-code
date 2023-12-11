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

// ------------------------ 给subscribe传递一个对象 -----------------------------
observable_foo.subscribe({
  next (x) {
    console.log('对象:', x)
  },
  complete() {
    console.log('complete11111111')
  }
})
console.log('subscriber after')


console.log('-------------------------------- create -------------------------------------')
const setTimeoutObservable = new Observable(function subscribe(subscriber) {
  setInterval(() => {
    subscriber.next('hello')
  }, 1000)
})

setTimeoutObservable.subscribe((x) => {
  console.log(x)
})

console.log('------------------------------ error ------------------------')
const error_observable = new Observable(function subscribe (subscriber) {
  try {
    subscriber.next(1)
    // @ts-ignore
    // subscriber.next(a)
    subscriber.next(2)
    subscriber.next(3)
  } catch (err) {
    subscriber.error(err)
  }
});

error_observable.subscribe({
  next: function(x) {
    console.log(x)
  },
  error: function(err) { // 捕获未定义的a变量错误, 不影响 上一个observable 的 定时器执行
    console.log('error111233', err)
  }
})

console.log('------------------------------- subscription --------------------------------')

const cancel_observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1)
  subscriber.next(2)
  setInterval(() => {
    subscriber.next('1500ms interval')
  }, 1500)
})

const subscription_1 = cancel_observable.subscribe(x => {
  console.log('subscription-1:', x)
})

const subscription_2 = cancel_observable.subscribe(x => {
  console.log('subscription-2:', x)
})
setTimeout(() => {
  subscription_1.unsubscribe()
}, 5000)