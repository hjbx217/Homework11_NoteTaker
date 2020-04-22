const db = require("../db/db.json");
const fs = require('fs');
const path = require("path");
const util = require("util");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
    console.log(db)
        res.json(db)
    });

    //another route for API POST //read the file, get hte info that already exsits in the front end, then write both of the info to the file 

//return fs.readfile 
  /*  function rNote() {
        return fs.readFile(path.join(__dirname , "../db/db.json"), "utf8", (err, data) => {
            if (err) throw err;
        });
    } */

    
    

    app.post("/api/notes", function(req, res) {
        //var note = rNote()

        //object destructuring
        const {title,text} = req.body
        console.log(title)
        console.log(text)

        //title, text, ID (need to increment the ID)
        let updatedNote = {title,text,id:1}
        //make sure the ID Isn't the same (used for delete file)
        
        //create an array, push updated notes, and then push db
        var allNotes = [];
        allNotes.push(updatedNote)
        allNotes.push(db)
        var jAllNotes = JSON.stringify(allNotes)

        //const allNotes = [...db]
        console.log(allNotes)

        var sNote = JSON.stringify(updatedNote)

       fs.writeFile(path.join(__dirname , "../db/db.json"), jAllNotes, (err) => {
            if (err) throw err;
        })
        console.log(req.body)

    }) 

}



