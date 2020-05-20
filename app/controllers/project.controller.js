const db = require("../models");
const Project = db.projects;
const Op = db.Sequelize.Op;

// Create and Save a new project
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a project
    const project = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Save project in the database
    Project.create(project)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the project."
        });
      });
  };

// Retrieve all projects from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Project.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving projects."
        });
      });
  };

// Find a single project with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Project.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving project with id=" + id
        });
      });
  };

// Update a project by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Project.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Project was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Project with id=" + id
        });
      });
  };

// Delete a project with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Project.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Project was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Project with id=" + id
        });
      });
  };

// Delete all projects from the database.
exports.deleteAll = (req, res) => {
    Project.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Projects were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all projects."
        });
      });
  };

// Find all published projects
exports.findAllPublished = (req, res) => {
    Project.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving projects."
        });
      });
  };