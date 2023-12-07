# Interceptors

  An interceptor is a class annotated with the **Injectable()** decorator and implements the **NestInterceptor** interface.
  (拦截器是一个使用 @Injectable() 装饰器的 类 并且实现了 NestInterceptor接口 )

## Basic

  Each interceptor implements the **interceptor()** method, which takes two arguments. The first one is the **ExecutionContext** instance.
  The second argument is a **CallHandler**. The **CallHandler** interface implements the **handle()** method. which
  you can use to invoke the route handler method at some point in your interceptor.
  (每个拦截器都实现了 interceptor() 方法, 该方法接受两个参数, 第一个参数是 ExecutionContext上下文实例, 第二个参数是一个 CallHandler接口, 该接口实现handle()方法, 你可以在某个节点执行该方法.)

  If you do not call the **handle()** method in your implementation of the **intercept()** method, the route handler
  method will not be executed at all.
  (如果没有执行 interceptor拦截器的第二个参数 handle() 方法, 路由方法不会执行)

  The **handle()** method returns an **Observable**.