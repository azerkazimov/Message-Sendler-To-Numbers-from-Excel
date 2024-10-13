import { read, utils } from "xlsx";

export const sheetConvertToJson = (sheet) => {
  return new Promise((resolve, reject) => {
    if (sheet) {
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        try {
          const data = event.target.result;
          const workbook = read(data, { type: "binary" });
          const allSheetsData = [];

          workbook.SheetNames.forEach((sheetName) => {
            const rowObject = utils.sheet_to_json(workbook.Sheets[sheetName]);
            allSheetsData.push(...rowObject);
          });

          resolve(allSheetsData);
        } catch (error) {
          reject(`Ошибка при обработке файла: ${error.message}`);
        }
      };

      fileReader.onerror = (error) => {
        reject(`Ошибка при чтении файла: ${error.message}`);
      };

      fileReader.readAsBinaryString(sheet);
    } else {
      reject("Нет выбранного файла.");
    }
  });
};
