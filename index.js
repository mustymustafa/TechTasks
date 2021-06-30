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
    arr.map(i => {
       
        

        b.map(v => {
            console.log(v)
            if(v.match(i)){
                //console.log('true')
                pep.forEach(it => {it[i] = true})
            
            } else {
                //console.log('false')
              pep.forEach(it => {it[i] = false})
            }
        })
       
               d.push(pep)

    })
console.log(d)
















    
  
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
  

   
    itemArray.map(i => {

           ColInQuestionData.map(item => {
  
       if(item.match(i)){
           //console.log('1')

        initialData.forEach(v => {v[i] = '1'})
        data.push(initialData)
     
        
 
       } else {
        //console.log('2')

         initialData.forEach(v => {v[i] = '2'})
        data.push(initialData)
     
    
       }
    
    })

    })

  

 

    const csv = Papa.unparse(initialData);


    //console.log(initialData)

    fs.createWriteStream(__dirname+'/task-output.csv').write(csv)



 
})


//
fs.createReadStream(__dirname+'/task-data.csv').pipe(parser);


