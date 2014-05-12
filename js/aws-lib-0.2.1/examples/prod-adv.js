var aws = require("../lib/aws");

prodAdv = aws.createProdAdvClient("AKIAJ7R4MLMJRAWBXWRQ", "//Dr8FE7VuGrIBW8+LCDStW5xjJCrBDspCyZVuF/" , "charliefortun-21");

prodAdv.call("ItemSearch", {SearchIndex: "Books", Keywords: "Javascript"}, function(err, result) {
  console.log(JSON.stringify(result));
})