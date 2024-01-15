import { Controller, Res, Get, StreamableFile, Header } from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import * as process from 'process';
import * as path from 'path';

@Controller('stream')
export class StreamController {
  @Get('package')
  getPackage(@Res() response: Response) {
    console.log(process.cwd());
    const file = createReadStream(path.join(process.cwd(), 'package.json'));
    console.log(file);
    file.pipe(response);
  }
  @Get('stream_package')
  getStreamPackage() {
    const file = createReadStream(path.join(process.cwd(), 'package.json'));
    console.log(file);
    return new StreamableFile(file);
  }
  @Get('download_package')
  downloadPackageFile(@Res({ passthrough: true }) response: Response) {
    const file = createReadStream(path.join(process.cwd(), 'package.json'));
    response.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="hello.json"',
    });
    return new StreamableFile(file);
  }
  @Get('download_image')
  @Header('Content-Type', 'application/json')
  @Header(
    'Content-Disposition',
    'attachment; filename=' + encodeURIComponent('周杰伦天王.jpg'),
  )
  downloadImage() {
    const image = createReadStream(path.join(process.cwd(), 'jay.jpeg'));
    return new StreamableFile(image);
  }
}
