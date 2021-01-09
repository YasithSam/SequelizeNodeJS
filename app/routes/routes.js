module.exports = app => {
    const events = require("../controllers/timelineController.js");
  
    var router = require("express").Router();
  
    // Create a new Event
    router.post("/", events.create);
  
    // Retrieve all Events
    router.get("/", events.findAll);

     // Delete all Events
     router.delete("/", events.deleteAll);
  
    // Retrieve a single event with id
    router.get("/:id", events.findOne);
  
    // Update a event with id
    router.put("/:id", events.update);
  
    // Delete a event with id
    router.delete("/:id", events.delete);
  
    app.use('/api/events', router);
  };