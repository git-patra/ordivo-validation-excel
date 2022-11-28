import { ParseExcelEntity } from '../entities/parse-excel.entity';

export class ValidateExcel {
  private result = {};

  constructor(private payload: ParseExcelEntity) {}

  validate(): any {
    const header_spaces = this.payload.headers.filter((head) =>
      head.includes('#'),
    );
    const header_required = this.payload.headers.filter((head) =>
      head.includes('*'),
    );

    for (const [index, value] of this.payload.data.entries()) {
      this.result[`row ${index + 1}`] = [];

      /** Validation Area */
      this.containSpace(header_spaces, value, index);
      this.requiredColumn(header_required, value, index);

      /** Join Result */
      this.result[`row ${index + 1}`] =
        this.result[`row ${index + 1}`].join(', ');
    }

    return this.result;
  }

  /**
   * Function for Validate String Contain space
   * @param headers
   * @param data
   * @param index
   * @private
   */
  private containSpace(headers: string[], data: any, index: number): void {
    for (const header of headers) {
      const data_row = data[header]?.toString();

      if (data_row && data_row.includes(' '))
        this.result[`row ${index + 1}`].push(
          `${header} should not contain any space`,
        );
    }
  }

  /**
   * Function for Validate String is empty
   * @param headers
   * @param data
   * @param index
   * @private
   */
  private requiredColumn(headers: string[], data: any, index: number): void {
    for (const header of headers) {
      if (!data[header])
        this.result[`row ${index + 1}`].push(`Missing value in ${header}`);
    }
  }
}
