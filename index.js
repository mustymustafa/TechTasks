const fs = require('fs');
const parse = require('csv-parse')
const Papa = require('papaparse');




const dataStream = fs.createReadStream("task-data.csv");
const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT)
dataStream.pipe(parseStream)


let data = [];

let headerArray = [];

let rowsData = [];

let newColumns = [];

let finalData = [];





parseStream.on("data", chunk => {
    data.push(chunk)
})

parseStream.on("finish", () => {
  

    //Initialize the headers with the data[0], which is the array that holds the header columns
    headerArray = data[0];

    //Initialize the rowsData with
    rowsData = data.slice(1)
    
    //Find Column in Question
    //To do this, we can find it using Index of the column  in question
    colInQuestionIndex = headerArray.indexOf('ColInQuestion');
    
    //Then we retrieve the data of each row for the Column in Question. 
    rowsData.map(data => {
    
    //We get the data for each row of the column in question
        const colInQuestionRowData = data[colInQuestionIndex]

    //The we use the data to generate the additional header columns. when doing this, we make sure we avoding adding duplicates to the header array
        colInQuestionRowData.split(";").map(data => {

            if (newColumns.indexOf(data) === -1) newColumns.push(data) 

            if (headerArray.indexOf(data) === -1) headerArray.push(data) 
          
        })
    })

  
    //console.log(newColumns)


    // Add 2 (not picked) to the row data for the new columns
    
        
        //check if the new columns is picked(1) or not picked(2)
        newColumns.map(column => {

            rowsData.map(data => {
                const colInQuestionRowData = data[colInQuestionIndex]

                if(colInQuestionRowData.match(column)){
                     data.push('1')
                } else {
                    data.push('2')
                }
            

            })

        })
        
     
 
  
    console.log(data)
    //console.log(rowsData)
    //console.log(headerArray.length)
    

    //unparse the file and create the output
       const csv = Papa.unparse(rowsData);
        fs.createWriteStream(__dirname+'/task-output.csv').write(csv)
   
  
})


