const fs = require('fs');



//the csv-parse package from the node-csv is required to read CSV files
const parse = require('csv-parse')
const Papa = require('papaparse');






const parser = parse({columns: true}, (err,records) => {
    var bodyData = [];

    var itemArray = [];

    var headerArray = [];

    var newBodyData = [];

    var ColInQuestionData = [];

    var initialData = [];
    var data = [];
    


    var d = [];
    const arr = ["a" , "b", "C"]
    const pep = [{
    name: 'Monica',
    age: 22,
    gender: 'female'
}, {
    name: 'Moni',
    age: 23,
    gender: 'male'
}]
    arr.map(i => {
        pep.map(it => {
            it[i] = i
            d.push(...pep)
        })

    })
//console.log(d[0])
    
  
    initialData = records;

      records.map(item => {

        //console.log(Object.keys(item))
        //console.log(Object.values(item))
        const body =  Object.values(item)

      
        
        //save body data
        bodyData.push(...body)
          //console.log(bodyData)


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
        initialData.map(it => {
            it[i] = '1'
            data.push(...initialData)
        })
     
        
        //newBodyData.push('1')
         //data = records.map(el => ({...el, [i]: '1'}))
       } else {
        //console.log('2')
          initialData.map(it => {
            it[i] = '2'
            data.push(...initialData)
        })
     
        //newBodyData.push('2')
        //data = records.map(el => ({...el, [i]: '1'}))
       }
       //console.log(item + '********')
    })
    //console.log(i + '===================================')
    })

    //console.log(data)

    //check if book exists

    //append data

    //bodyData.push(...newBodyData)

    //console.log(bodyData)

 
    //data = [headerArray]
    const csv = Papa.unparse(data);
    //console.log(csv)

    //console.log(data)

    fs.createWriteStream(__dirname+'/task-output.csv').write(csv)



 
})


//
fs.createReadStream(__dirname+'/task-data.csv').pipe(parser);


