const fs = require("fs");

const Papa = require("papaparse");



//** DECLARE OUR ARRAYS
let initialData = [];

let headerArray = [];

let rowsData = [];

let newColumns = [];



fs.readFile(__dirname + "/task-data.csv", (error, fileData) => {
  if (error) {
    throw error;
  }

  //console.log(fileData.toString())
  const fileDataString = fileData.toString();

  //PARSE CSV STRING
  Papa.parse(fileDataString, {
    complete: (data) => {
      //console.log(data.data)

      initialData = data.data;

      //**STEP 1 */
      //Initialize the headers with the data[0], which is the array that holds the header columns
      headerArray = initialData[0];

      //Initialize the rowsData with data.slice(1). This is going to give us an array of arrays that hold the data of the rows
      rowsData = initialData.slice(1);

      //**STEP 2  - Find Column in Question*/

      //To do this, we will use the 'ColInQuestion' index
      colInQuestionIndex = headerArray.indexOf("ColInQuestion");

      //Then we retrieve the data of each row for the Column in Question.
      rowsData.map((data) => {
        //We get the data for each row of the column in question using the colInQuestionIndex
        const colInQuestionRowData = data[colInQuestionIndex];

        //The we use the data to generate the additional header columns. when doing this, we make sure we avoid adding duplicates to the header array

        colInQuestionRowData.split(";").map((data) => {
          // The newColumns array will help us assign data - 1(picked) or 2(not picked) to our additional columns.
          if (newColumns.indexOf(data) === -1) newColumns.push(data);

          //Then we add our unique set of additional column headers to the initial headers
          if (headerArray.indexOf(data) === -1) headerArray.push(data);
        });
      });

      //console.log(newColumns)

      //**STEP 3 - populate our newly created columns with the appropriate data. */ //
      newColumns.map((column) => {
        rowsData.map((data) => {
          const colInQuestionRowData = data[colInQuestionIndex];
          // if the column is picked, we add 1 as the column value
          if (colInQuestionRowData.match(column)) {
            data.push("1");
          } else {
            // if the column isn't picked, we add 2 as the column value
            data.push("2");
          }
        });
      });

      //**LAST STEP - unparse the data and generate the output file */

      const transformedData = Papa.unparse({
        fields: headerArray,
        data: rowsData,
      });
      fs.createWriteStream(__dirname + "/task-output.csv").write(
        transformedData
      );

      //console.log(transformedData)
    },
  });
});
