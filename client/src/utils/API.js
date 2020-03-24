import axios from "axios";

export default {
  getTeachbacks: function() {
    return axios.get("/api/teachbacks");
  },
  // Gets all teachbacks associated with a particular user
  getUserTeachbacks: function(userID) {
    return axios.get("/api/teachbacks/myTBs/" + userID);
  },
  // Gets the teachback with the given id
  getTeachback: function(id) {
    return axios.get("/api/teachbacks/" + id);
  },
  // Deletes the teachback with the given id
  deleteTeachback: function(id) {
    return axios.delete("/api/teachbacks/" + id);
  },
  // Updates the teachback with the given id
  updateTeachback: function(id, teachbackData) {
    return axios.put("/api/teachbacks/" + id, teachbackData);
  },
  // Saves a teachback to the database
  saveTeachback: function(teachbackData) {
    return axios.post("/api/teachbacks", teachbackData);
  },
  returnUser: function() {
    return axios.get("/auth/user");
  },
  returnAllUsers: function() {
    return axios.get("/api/user");
  }
};
