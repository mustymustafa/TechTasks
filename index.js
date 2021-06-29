const fs = require('fs');
const express = require('express');
const app = express();

const http = require('http').createServer(app);


//the csv-parse package from the node-csv is required to read CSV files
const parse = require('csv-parse')
const Papa = require('papaparse');
const csv = require('fast-csv')



var data = [];
//
const parser = parse({columns: true}, (err,records) => {
    var bodyData = [];

    var itemArray = [];

    var headerArray = [];

    var newBodyData = [];

    var ColInQuestionData = [];

    
    
  
    //console.log(records)
      records.map(item => {

        //console.log(Object.keys(item))
        //console.log(Object.values(item))
        const body =  Object.values(item)

        //save body data
        bodyData.push(...body)

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
            
            

    //add new headers
    headerArray.push(...itemArray)
    //console.log(ColInQuestionData.length)

    itemArray.map(i => {
           ColInQuestionData.map(item => {
       // const b = ColInQuestionData.includes(i)
       if(item.match(i)){
        //console.log('1')
        newBodyData.push('1')
       } else {
        newBodyData.push('2')
       }
       //console.log(item + '********')
    })
   // console.log(i + '===================================')
    })
 

    //check if book exists

    //append data

    bodyData.push(...newBodyData)
    //console.log(bodyData)

    data = [headerArray, bodyData]
    const csv = Papa.unparse(data);
    console.log(data)

 
})


//
fs.createReadStream(__dirname+'/task-data.csv').pipe(parser);




app.use("/public", express.static(__dirname + "/public"));


//start server
http.listen(3000, () => {
    console.log("server connected")

    app.get("/", (req, res) => {

        const ws = fs.createWriteStream("public/task-output.csv");
        csv.write(data, {headers: true}).on("finish", () => {
            res.send("send");
        })
        
    })
})