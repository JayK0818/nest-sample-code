import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  UsePipes,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { Express } from 'express';
import * as multer from 'multer';
import { FileSizeValidationPipe } from './file-validation.pipe';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const filename = `${file.originalname}.${ext}`;
    cb(null, filename);
  },
});

@Controller('file-upload')
export class FileUploadController {
  @Post('profile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: {},
      // dest: 'uploads/',
      // preservePath: true,
    }),
  )
  handleUserProfile(@UploadedFile() file: Express.Multer.File) {
    return '上传成功';
  }
  @Post('video')
  // @UsePipes(FileSizeValidationPipe)
  @UseInterceptors(FileInterceptor('video'))
  handleUploadVideo(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return '视频上传成功';
  }
  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  handleUploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 })
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return '图片上传成功';
  }
  // 上传多个文件
  @Post('videos')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: multer.diskStorage({
        destination: 'uploads/',
      }),
    }),
  )
  handleUploadVideos(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('video-list', files);
    return '批量文件上传成功';
  }
  // 不同字段对应不同的文件
  @Post('field-videos')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'hello' }, { name: 'world' }]),
  )
  handleUploadFieldVideos(@UploadedFiles() files: any) {
    console.log('files', files);
    return 'success';
  }
}
