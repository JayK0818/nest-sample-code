# File Upload

To handle file uploading, Nest provides a built-in module based on the **multer** middleware package
for Express. Multer handles data posted in the **multipart/form-data** format, which is primarily used for
uploading files via an HTTP **POST** request.
(为了处理文件上传, Nest 提供一个内置的模块 依赖于 Express 的中间件 multer. Multer 处理传递 **multipart/form-data**格式的文件数据)

```ts
// 下载第三方依赖
npm i -D @types/multer
```

## Usage

```ts
import { MulterModule } from '@nestjs/platform-express'
@Module({
  imports: [
    // 此方式未配置成功???
    MulterModule.register({
      dest: './upload'
    })
    // 动态配置
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload'
      })
    })
  ]
})

import {
  Post,
  Controller,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('file-upload')
export class FileUploadController {
  @Post('profile')
  @UseInterceptors(FileInterceptor('file'))
  handleUploadProfile(@UploadFile() file: Express.Multer.File) {
    console.log(file);
  }
}
```

### FileInterceptor()

FileInterceptor() 装饰器接受两个参数

1. fieldName: string that supplies the name of the field form the HTML form that holds a file(file 文件所对应的字段名)
2. options: 可选的一个对象参数, 传递个 multer 构造函数

```ts
{
  //...
  @UseInterceptors(FileInterceptor('profile')) // form-data中文件对应的字段应为 profile
  handleUploadProfile(@UploadFile() file: Express.Multer.File) {
    console.log(file)
  }
}

// options
1. dest / storage: where to store the files (存储文件的位置)
2. limits: Limits of the uploaded data (文件上传大小限制)
3. fileFilter: Function to control which files are accepted (控制接受的文件类型)
4. preservePath: Keep the full path of files instead of just the base name (保持完整路径而不是一个基础的路径名)
```

```ts
// 使用dest 为一个字符串
{
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads/',   // 上传的文件目录
    preservePath: true, // 如果设置为true, 并且上传文件路径为 'uploads/', 那么接受到的 对象 path属性为 /uploads/xxxxx
  }))
}

// 使用storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // destination 也可以传递一个字符串
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const filename = `${file.originalname}.${ext}`;
    cb(null, filename);
    /**
     * Multer will not append any file extension for you, your function should return a
     * filename complete with an file extension
     * (Multer不会给文件添加后缀, 定义的函数需要返回一个完整包含后缀的文件名)
    */
  },
});
{
  @UseInterceptors(FileInterceptor('file', {
    storage
  }))
}
```

3. limits

An object specifying the size limits of the following optional properties.

[multer-limits-options](https://github.com/expressjs/multer?tab=readme-ov-file#limits)

4. fileFilter

Set this to a function to control which files should be uploaded and which should be skipped.
(设置一个函数控制哪个文件应该被上传, 哪个文件被忽略)

```ts
function fileFilter(req, file, cb) {
  cb(null, false); // to reject this file
  cb(null, true); // to accept the file
}
```

## FileValidation

Often times it can be useful to validate incoming file metadata, like file size or file mini-type.
(通常验证文件的元信息 很有用, 比如 文件大小,文件类型等)

```ts
// 使用 自定义pipe
// file-size.validation.ts
import { PipeTransform, Injectable ArgumentMetadata, NotAcceptableException } from '@nestjs/common'
export class FileSizeValidationPipe implements PipeTransform {
  transform (value: any, metadata: ArgumentMetadata) {
    if (value.size > 1000) {
      throw new NotAcceptableException('文件过大')
    }
    return value
  }
}

// xxx.controller.ts
import { FileSizeValidationPipe } from './file-size.validation.ts'
@Controller()
export class FileUploadController {
  @Post('video')
  @UsePipes(FileSizeValidationPipe)
  @UseInterceptors(FileInterceptor('video'))
  handleUploadVideo() {
    // 当文件大于指定的大小时 会抛出异常
  }
}
```

Nest 提供了一些内置的 常用的验证 Pipe, 叫做 **ParseFilePipe**

1. MaxFileSizeValidator
2. FileTypeValidator

```ts
// usage
import {
  UseInterceptors,
  UploadedFile,
  MaxFileSizeValidator,
  Controller,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class FileUploadController {
  @UseInterceptors(FileInterceptor('image'))
  handleUploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Multer.Express.File,
  ) {}
}
```

## Array of files

To upload an array of files, use the **FilesInterceptor()** decorator. 该装饰器接受 3 个参数

1. fieldName: 文件字段名
2. maxCount: optional number define the maximum number of files to accept (可以接受的最大文件数量)
3. options: 传递给 multer 函数的对象参数

When using **FilesInterceptor()**, extract files from the request with the **UploadedFiles()** decorator.

```ts
// 一个字段 包含多个文件
import { UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class FileUploadController {
  @UseInterceptors(
    // 同一个字段, 最多传递3个文件
    FilesInterceptor('videos', 3, {
      storage: multer.diskStorage({
        destination: 'uploads/',
      }),
    }),
  )
  handleUploadMultipleVideo(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files); // files为一个数组
  }
}
```

## Multiple files

To upload multiple files, use the **FileFieldsInterceptor()** decorator.
(有多个字段 的文件上传, 使用 FileFieldsInterceptor()装饰器, 该装饰器接受两个参数)

1. uploadedFields: 是一个数组,数组中每项数据为对象, 包含一个必选的 **name**属性, 一个可选的 **maxCount** 属性
2. options: optional **MulterOptions** object.

```ts
@Post('upload')
@UseInterceptors(FileFieldsInterceptor([
  { name: 'avatar', maxCount: 1 },
  { name: 'background', maxCount: 1 },
]))
uploadFile(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
  // 定义的每个字段 接受的文件为一个数组
  console.log(files);
}
```
