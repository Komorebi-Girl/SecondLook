import axios from "axios";

export default {
  getOneonOnes: function () {
    return axios.get("/api/OneonOne");
  },
  // Gets all One-on-Ones associated with a particular user
  getUserOneonOnes: function (userID) {
    return axios.get("/api/OneonOne/myOneonOnes/" + userID);
  },
  // Gets the One-on-One with the given id
  getOneonOne: function (id) {
    return axios.get("/api/OneonOne/" + id);
  },
  // Deletes the One-on-One with the given id
  deleteOneonOne: function (id) {
    return axios.delete("/api/OneonOne/" + id);
  },
  // Updates the One-on-One with the given id
  updateOneonOne: function (id, OneonOneData) {
    return axios.put("/api/OneonOne/" + id, OneonOneData);
  },
  // Saves a One-on-One to the database
  saveOneonOne: function (OneonOneData) {
    return axios.post("/api/OneonOne", OneonOneData);
  },
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
