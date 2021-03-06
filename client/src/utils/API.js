import axios from "axios";

export default {
  getTAFinals: function () {
    return axios.get("/api/taFinals");
  },
  // Gets all TA finals associated with a particular user
  getUserTAFinals: function (userID) {
    return axios.get("/api/taFinals/mytaFinals/" + userID);
  },
  // Gets the TA final with the given id
  getTAFinal: function (id) {
    return axios.get("/api/taFinals/" + id);
  },
  // Deletes the TA final with the given id
  deleteTAFinal: function (id) {
    return axios.delete("/api/taFinals/" + id);
  },
  // Updates the TA final with the given id
  updateTAFinal: function (id, taFinalData) {
    return axios.put("/api/taFinals/" + id, taFinalData);
  },
  // Saves a TA final to the database
  saveTAFinal: function (taFinalData) {
    return axios.post("/api/taFinals", taFinalData);
  },
  getTeachbacks: function () {
    return axios.get("/api/teachbacks");
  },
  // Gets all teachbacks associated with a particular user
  getUserTeachbacks: function (userID) {
    return axios.get("/api/teachbacks/myTBs/" + userID);
  },
  // Gets the teachback with the given id
  getTeachback: function (id) {
    return axios.get("/api/teachbacks/" + id);
  },
  // Deletes the teachback with the given id
  deleteTeachback: function (id) {
    return axios.delete("/api/teachbacks/" + id);
  },
  // Updates the teachback with the given id
  updateTeachback: function (id, teachbackData) {
    return axios.put("/api/teachbacks/" + id, teachbackData);
  },
  // Saves a teachback to the database
  saveTeachback: function (teachbackData) {
    return axios.post("/api/teachbacks", teachbackData);
  },
  returnUser: function () {
    return axios.get("/auth/user");
  },
  returnAllUsers: function () {
    return axios.get("/api/user");
  },
};
