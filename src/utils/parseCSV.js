import Papa from "papaparse";

/**
 * parseCSV(file)
 *  - читает файл (File object) как текст
 *  - автоматически определяет разделитель: таб, запятая или точка с запятой
 *  - парсит CSV в массив объектов (header:true)
 *  - возвращает Promise -> array of rows (raw)
 */
export async function parseCSV(file) {
  if (!file) return [];

  // Прочитать текст файла (работает в браузере)
  const text = await file.text();

  // Определить разделитель по первой строке
  const firstLine = text.split(/\r\n|\n/)[0] || "";
  let delimiter = ","; // по умолчанию
  if (firstLine.indexOf("\t") !== -1) delimiter = "\t";
  else if (firstLine.indexOf(";") !== -1) delimiter = ";";

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      delimiter,
      dynamicTyping: false,
      transformHeader: (h) => (h || "").trim(), // убрать пробелы в заголовках
      complete: (results) => {
        resolve(results.data || []);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
}
