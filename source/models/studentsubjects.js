'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentSubjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentSubjects.init({
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentSubjects',
  });
  return StudentSubjects;
};