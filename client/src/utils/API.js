import axios from "axios";

export default {
  // Gets all teachbacks
  getTeachbacks: function() {
    return axios.get("/api/teachbacks");
  },
  // Gets the teachback with the given id
  getTeachback: function(id) {
    return axios.get("/api/teachbacks/" + id);
  },
  // Deletes the teachback with the given id
  deleteTeachback: function(id) {
    return axios.delete("/api/teachbacks/" + id);
  },
  // Saves a teachback to the database
  saveTeachback: function(teachbackData) {
    return axios.post("/api/teachbacks", teachbackData);
  }
};
