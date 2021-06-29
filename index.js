const fs = require('fs');

//the csv-parse package from the node-csv is required to read CSV files
const parse = require('csv-parse')


//
const parser = parse({columns: true}, (err,records) => {
    var newHeaderData = [];

    var itemArray = [];

    var headerArray = [];

    var BodyArray = [];

    var ColInQuestionData = [];
    
    
  
    //console.log(records)
      records.map(item => {

        //console.log(Object.keys(item))

        const values = Object.values(item)[Object.values(item).length-1]
        //console.log(values);
        ColInQuestionData.push(values)

        //create a non duplicate array
        headerArray = [...new Set(Object.keys(item))]

               const newHeaders = item.ColInQuestion.split(";").map(item => {
            
            //itemArray.push(item)
            
            if (itemArray.indexOf(item) === -1) itemArray.push(item) 

            //push the items that consists of the list values in ColInQuestion (without duplicates)
            
            

        })
      })
            
            

    headerArray.push(...itemArray)
    //console.log(ColInQuestionData.length)

    itemArray.map(i => {
           ColInQuestionData.map(item => {
       // const b = ColInQuestionData.includes(i)
       if(item.match(i)){
        console.log('1')
       } else {
           console.log('2')
       }
       //console.log(item + '********')
    })
    console.log(i + '===================================')
    })
 

    //check if book exists




 
})


//
fs.createReadStream(__dirname+'/task-data.csv').pipe(parser);

