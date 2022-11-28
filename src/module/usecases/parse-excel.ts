import * as xlsx from 'xlsx';
import * as path from 'path';
import { ParseExcelEntity } from '../entities/parse-excel.entity';

export class ParseExcel {
  constructor(private file: any) {}

  async get(): Promise<ParseExcelEntity> {
    const fullFilePatch = path.resolve(
      __dirname,
      '../../../uploads/',
      this.file,
    );

    const readFile = xlsx.readFile(fullFilePatch);
    const worksheet = readFile.Sheets[readFile.SheetNames[0]];

    const headers = [];
    for (const key in worksheet) {
      const regEx = new RegExp('^(\\w)(1){1}$');
      if (regEx.test(key) == true) {
        headers.push(worksheet[key].v);
      }
    }

    return {
      data: xlsx.utils.sheet_to_json(worksheet),
      headers,
    };
  }
}
