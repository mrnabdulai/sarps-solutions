import jsPDF from 'jspdf'

export const toCSV = () => {

}


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
