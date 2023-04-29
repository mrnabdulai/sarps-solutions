import jsPDF from 'jspdf'

export const toCSV =  () =>{

}


export const exportToPdf = async (data, fileName) => {
    if(data.length == 0) return
    var generateData = function(amount) {
        var result = [];
   const tempData = data;
   for (i=0; i<tempData.length; i++) {
    for (var property in tempData[i]){
        if (  tempData[i][property] == null) tempData[i][property] = ""
        tempData[i][property] = tempData[i][property].toString()
    }
   }
        for (var i = 0; i < tempData.length; i += 1) {
          result.push(Object.assign({},tempData[i] ));
        }
        console.log(result)
        return result;
      };
      
      function createHeaders(keys) {
        var result = [];
        for (var i = 0; i < keys.length; i += 1) {
          result.push({
            id: keys[i],
            name: keys[i],
            prompt: keys[i],
            width: 65,
            align: "center",
            padding: 0
          });
        }
        return result;
      }
      
      var headers = createHeaders(Object.keys(data[0]));
      
      var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
      doc.table(1, 1, generateData(), headers, { autoSize: true });
      doc.save(fileName)
}