import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import tinify from 'tinify';

interface FileCompressionPipeOptions {
  targetResolution: number;
}

export class FileCompressionPipe implements PipeTransform {
  constructor(private options: FileCompressionPipeOptions) {}
  async transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    tinify.key = process.env.TINIFY_KEY;
    const source = tinify.fromBuffer(value.buffer);
    const resized = source.resize({
      method: 'cover',
      width: this.options.targetResolution,
      height: this.options.targetResolution,
    });
    value.buffer = Buffer.from(await resized.toBuffer());
    value.size = value.buffer.length;
    return value;
  }
}
