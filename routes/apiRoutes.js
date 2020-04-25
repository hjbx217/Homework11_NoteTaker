const db = require("../db/db.json");
const fs = require('fs');
const path = require("path");
const util = require("util");

module.exports = function(app) {
    var stat = util.promisify(fs.readFile);
    function readingFile() {
        return stat(path.join(__dirname , "../db/db.json"),"utf8")
    }
    app.get("/api/notes", function(req, res) {
    var pNote;
    readingFile()
    .then(pNote => { 
        var parpNote = JSON.parse(pNote)
        console.log("--");
        console.log(pNote);
        res.json(parpNote);
    });
    });


    var index = 10

    
    

    app.post("/api/notes", function(req, res) {
        //var note = rNote()

        //object destructuring
        const {title,text} = req.body
       // console.log(title)
       // console.log(text)
        
        //title, text, ID (need to increment the ID)
        let updatedNote = {title,text,id:index}
        //make sure the ID Isn't the same (used for delete file)
        index ++;
        

        //create an array, push updated notes, and then push db
        var allNotes = [];
        allNotes.push(updatedNote)
        allNotes.push(db)
        db.push(updatedNote)
        console.log(db)
        var jAllNotes = JSON.stringify(db)


        //  var sNote = JSON.stringify(updatedNote)

       fs.writeFile(path.join(__dirname , "../db/db.json"), jAllNotes, (err) => {
            if (err) throw err;
        });

        res.redirect("/notes")
       // console.log(req.body)

    }); 

    app.delete("/api/notes/:id", function(req, res) {
        var del = JSON.parse(req.params.id)
        let result; 
        result = db.filter(item => item.id !== del);
        console.log(del);
        console.log(result);

        var jAllNotes = JSON.stringify(result)
       fs.writeFile(path.join(__dirname , "../db/db.json"), jAllNotes, (err) => {
            if (err) throw err;
        });
        res.json({ok: true})
    });

}



