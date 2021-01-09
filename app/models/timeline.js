module.exports = (sequelize, Sequelize) => {
    const Timeline = sequelize.define("timeline", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    });
  
    return Timeline;
};