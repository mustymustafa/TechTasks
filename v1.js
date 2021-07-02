const fs = require('fs');
const parse = require('csv-parse')
const Papa = require('papaparse');





// A Parser is created with the columns option set to true. This generates the records as an array consisting of object literals.
const parser = parse({columns: true}, (err,records) => {
//console.log(records)



// create arrays to store the various values


// The Header Array holds the data that will be used to create the headers
    var headerArray = [];

// The Body Array holds the rest of the values that will be used to populate the body
    var bodyData = [];

// Item Array will be used to hold the values of the Column in Question. The text would be extracted and stored without having duplicates
// E.G [Art Therapy', 'Blues Project',  'Mental Health in Schools Team', 'Response', 'CAMHS',......]
    var itemArray = [];

// All the values from the ColInQuestion column would be retrived and stored here. we will use this along with the itemArray to find a solution to the 4th bulletpoint in the pdf
//i.e each item in itemArray will be compared with each item in ColInQuestion to set 1(picked) or 2(not picked) for the new set of columns
    var ColInQuestionData = [];

//The data we get from the parser parse callback will be store here. That is the data from records
    var data = [];


    



  

    var d=[];
        const arr = ["a" , "b", "c"]
        const b = ["a;b", "e;d", "b;c"]

    const pep = [{
    name: 'Monica',
    age: 22,
    gender: 'female'
}, {
    name: 'Moni',
    age: 23,
    gender: 'male'
}]


pep.forEach(it => {

    arr.map(i => {

        b.map(v => {

            if(i.match(v)){
                it[i] = true
                      d.push(pep)
            } else {
                it[i] = false
                      d.push(pep)
            }
        })
    
    })
    
})
    
console.log(d)







// Initialize the data array with the data from records
    data = records;



//****STEP 1: Extracting the Headers and Body ******

//console.log(records) to examine the data returned

//The data returned is an array of objects. 
//So, have to loop through the array to access the individual objects
      records.map(item => {

//From the data returned, the Keys of the object represents the Header while the values represent the body

//console.log(Object.keys(item))
//console.log(Object.values(item))
const header =  Object.keys(item)
const body =  Object.values(item)


// Initialize the bodyData array 
        
        bodyData.push(...body)



// **STEP 2: Identify the Column in question and retrieve the data***

//From the data returned, we can see that the Column in question is the Last Element in the body array.
//console.log(body)
//To get the last element, we use the length of the array - 1
        const values = body[body.length-1]
        //console.log(values);

//Store the values of the Column in Questions for each row in the ColInQuestionData array.
// We will use this along with the itemArray to to construct a unique set of CSV column headers and their values
        ColInQuestionData.push(values)


//***STEP 3 - CONSTRUCTION OF HEADERS ***

//console.log(header)
// We will extract the original headers from the records data and create a unique header dataset (removing all duplicates). 
        headerArray = [...new Set(header)]

//** STEP 4 -  Extract the values of the items in the Column in Question to generate our new additional column headers***
//The values will be stored in the itemArray
// we will split the values by ";" and store them in the itemArray (without duplicates)

               const newHeaders = item.ColInQuestion.split(";").map(item => {
            
            if (itemArray.indexOf(item) === -1) itemArray.push(item) 

            //push the items that consists of the list values in ColInQuestion (without duplicates)
            
            

        })
      })
            
            
//***** STEP 5  -- add our newly retrieved column headers to the headerArray ***
    headerArray.push(...itemArray)
  

   

//***** STEP 6 ---  populate the Header Columns with the new Header set and Determine the column Values

//*******There should be 23 additional columns

//console.log("columns " + itemArray.length)
//console.log("rows " + ColInQuestionData.length)



//We have to populate the 23 additional columns with values (1 for picked or 2 for not picked)
//This will be done for all 40 rows
//We should expect a total of 920 data after looping through the array
//console.log("newly expected data size: " + itemArray.length * ColInQuestionData.length)


//We start by looping from the itemArray - This holds the 23 additional columns
    itemArray.map(i => {

//Then we loop through the 40 rows 
           ColInQuestionData.map(item => {
//For each row, we check if the item in column i exists in the Column in Question data
       if(item.match(i)){
           //console.log('1')

// If it exists, we assign the value of the colum to 1
        data.forEach(v => {v[i] = '1'}) 
       } else {
        //console.log('2')
// If it does not exist, we assign the value of the colum to 2
         data.forEach(v => {v[i] = '2'})
        
     
    
       }
    
    })

    })

  

 
// ****Final Step-  we unparse the data and create an output file
    const csv = Papa.unparse(data);
    fs.createWriteStream(__dirname+'/task-output.csv').write(csv)
})


// **** Read the file to retrieve data from
fs.createReadStream(__dirname+'/task-data.csv').pipe(parser);


