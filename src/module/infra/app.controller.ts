import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileDto } from './dto/file.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ParseExcel } from '../usecases/parse-excel';
import { getFilePath, StoreFileConfig } from '../usecases/store-file.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateExcel } from '../usecases/validate-excel';

@Controller()
export class AppController {
  @Post('/excel')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileDto })
  @UseInterceptors(FileInterceptor('document', StoreFileConfig))
  async validate(@UploadedFile() document): Promise<string> {
    const payload = await new ParseExcel(getFilePath(document)).get();

    return new ValidateExcel(payload).validate();
  }
}
