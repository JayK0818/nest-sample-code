# Modules

  A Module is a class annotated with a **@Module()** decorator. Each application has at least one module, a **root module**
  (每个应用程序至少有一个模块 根模块)

  The **Module()** decorator takes a single object whose properties describe the module:
1. providers
2. controllers
3. imports  (the list of imported modules that export the providers which are required in this module)
  导入的modules列表. 被导入的module中导出了providers. 而当前module中使用了公用的providers
4. exports (provides by this module and should be available in other modules which import this module) 共享providers

  The Module encapsulates providers by default, This means that it is impossible to inject providers that are neither directly part of the
  current module nor exported from the imported modules. 