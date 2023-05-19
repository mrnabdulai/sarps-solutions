import jsPDF from 'jspdf'
import { utils as XLSXUtils, write as XLSXWrite } from 'xlsx';



export const exportToPdf = async (data, fileName) => {
  if (data.length === 0) return;

  // Function to calculate the width of the text
  function getTextWidth(text, fontSize = 12) {

    doc.setFontSize(fontSize);
    if (text == null) return 0
    if (typeof text === 'string' || text instanceof String) {
      text = text
      // it's a string
    } else {
      text = text.toString()
    }
    var textWidth = doc.getStringUnitWidth(text) * fontSize;
    return textWidth;
  }

  var generateData = function (amount) {
    var result = [];
    const tempData = data;
    for (i = 0; i < tempData.length; i++) {
      for (var property in tempData[i]) {
        if (tempData[i][property] == null) tempData[i][property] = "";
        tempData[i][property] = tempData[i][property].toString();
      }
    }
    for (var i = 0; i < tempData.length; i += 1) {
      result.push(Object.assign({}, tempData[i]));
    }
    return result;
  };
  var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape", });

  function createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {

      var columnWidth = Math.max(
        getTextWidth(keys[i], 12), // Adjust the font size as needed
        ...data.map((item) => getTextWidth(item[keys[i]], 12)) // Adjust the font size as needed
      );
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: columnWidth,
        align: "center",
        padding: 0,
      });
    }
    return result;
  }



  var headers = createHeaders(Object.keys(data[0]));
  // doc.wi

  function getDocumentWidth() {
    var total = 0
    for (var i = 0; i < headers.length; i++) {
      total += headers[i].width
    }
    return total
  }


  // Calculate the total width required for the table

  var tableWidth = headers.reduce((total, header) => total + header.width, 0);
  doc.internal.pageSize.width = getDocumentWidth()

  doc.table(1, 1, generateData(), headers, { autoSize: true, tableWidth: tableWidth });
  doc.save(fileName);
};


export const exportToExcel = (data, fileName) => {
  // Create a new workbook
  const workbook = XLSXUtils.book_new();

  // Convert data to a worksheet
  const worksheet = XLSXUtils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSXUtils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate a XLSX file
  const excelBuffer = XLSXWrite(workbook, { bookType: 'xlsx', type: 'array' });

  // Create a Blob object for the XLSX file
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Create a temporary download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}.xlsx`);

  // Trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};



export const exportToCSV = (data, fileName) => {
  // Convert data to worksheet
  const worksheet = XLSXUtils.json_to_sheet(data);

  // Convert worksheet to CSV format
  const csvContent = XLSXUtils.sheet_to_csv(worksheet);

  // Create a Blob object for the CSV file
  const blob = new Blob([csvContent], { type: 'text/csv' });

  // Create a temporary download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}.csv`);

  // Trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};