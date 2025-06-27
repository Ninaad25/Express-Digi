import express from 'express'

const app = express() 
const port = 3001
app.use(express.json()) // any data coming in json format, we accept that

let teaData = []
let nextId = 1 // for generating unique id 

// `post` is better way of saving data into DB
app.post('/teas', (req, res) =>{
    
   const { name, price } = req.body // destructuring the data means we are taking only the data we need.
   const newTea = { id: nextId++, name, price } // creating a new tea object
   teaData.push(newTea) // adding the new tea to the array
   res.status(201).send(newTea) // sending the new tea back to the client
})

// `get` is used to fetch data from DB (get all tea)
app.get("/teas", (req, res)=>{
    res.status(200).send(teaData)
});

// getting a single tea by id
app.get("/teas/:id", (req, res)=>{ // `params` is used to get anything from `url`
    const tea = teaData.find(t=> t.id === parseInt(req.params.id)) 
    // but, anything that comes from url is in `string` format.So, we used `parseInt` to convert it to `number`

    if (!tea) {
        return res.status(404).send("Tea not found...")
    }
    res.status(200).send(tea);
})

// update tea
app.put("/teas/:id", (req, res)=> {
const tea = teaData.find(t => t.id === parseInt(req.params.id)); // finding the data

if (!tea) {
  return res.status(404).send("Tea not found...");
}
const {name, price} = req.body  // getting the new data from the body
tea.name = name
tea.price = price
res.status(200).send(tea); // sending the updated data back to the client
})

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex(t=> t.id === parseInt(req.params.id)) // finding the index of the tea

  if (index === -1) {
    return res.status(404).send("Tea not found...");   
  }
  teaData.splice(index, 1) // deleting the tea from the array
  return res.status(200).send("Deleted");
})


// app.get("/",(req, res)=>{
//     res.send("Hello from ninaad!")
// })
// app.get("/ice-tea",(req, res)=>{
//     res.send("What ice-tea would you like?")
// })
// app.get("/twitter",(req, res)=>{
//     res.send("ninaad390dotcom")
// })

app.listen(port, ()=>{ // listen to port
    console.log(`Server is running on port ${port}...`)
})