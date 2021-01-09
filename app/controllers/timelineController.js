const db = require("../models");
const Timeline = db.timeline;
const Op = db.Sequelize.Op;

// Create and Save a new timeline event 
exports.create = (req, res) => {
        // Validate request
        if (!req.body.title) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
          return;
        }
      
        // Create a Timeline
        const timeline = {
          title: req.body.title,
          description: req.body.description,
        };
      
        // Save event in the database
        Timeline.create(timeline)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Event."
            });
          });
    
  
};

// Retrieve all events from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Timeline.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    });
  
};

// Find a single event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Timeline.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving event with id=" + id
      });
    });
  
};

// Update an event by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Timeline.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Event was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Event with id=" + id
        });
      });
  
};

// Delete an event with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Timeline.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Timeline was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete event with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete event with id=" + id
        });
      });
  
};

// Delete all events from the database.
exports.deleteAll = (req, res) => {
  Timeline.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Events were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all events."
      });
    });
  
};

