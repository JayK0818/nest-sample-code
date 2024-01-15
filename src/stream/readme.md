# Stream

There may be time where you would like to send back a file from your **REST API** to the client.

以下为一个官网的 Demo, 返回 package.json 文件

```ts
import { Controller, Res, Get } from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import * as process from 'process';
import * as path from 'path';

@Controller('stream')
export class StreamController {
  @Get('package')
  getPackage(@Res() response: Response) {
    console.log(process.cwd()); // 项目根目录
    const file = createReadStream(path.join(process.cwd(), 'package.json'));
    file.pipe(response);
  }
}
```

## Streamable File class

A **StreamableFile** is a class that holds onto the stream that is to be returned.

This is an example of returning the **package.json** as a file instead of a JSON.

```ts
import { Controller, Get, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class FileStreamController {
  @Get()
  getFile() {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
```

以上案例 默认的响应头 content-type 为 **application/cctet-stream**, 如果需要定制响应, 你可以使用 **res.set** method,
或者 **@Header()** decorator.

```ts
@Controller()
export class FileDownloadFile {
  @Get('download_image')
  @Header('Content-Type', 'application/json')
  @Header(
    'Content-Disposition',
    // 此处如果包含中文 使用 encodeURIComponent
    'attachment; filename=' + encodeURIComponent('周杰伦天王.jpg'),
  )
  downloadImage() {
    const image = createReadStream(path.join(process.cwd(), 'jay.jpeg'));
    return new StreamableFile(image);
  }
}
```
