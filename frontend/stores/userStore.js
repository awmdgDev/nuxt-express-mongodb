import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const users = ref([]);
  const user = ref({ name: "", email: "" });
  const nuxtApp = useNuxtApp();
  const $axios = nuxtApp.$axios;

  const fetchUsers = async () => {
    try {
      const response = await $axios.get("/users");
      users.value = response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserById = async (id) => {
    try {
      const response = await $axios.get(`/users/${id}`);
      user.value = response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const createUser = async (newUser) => {
    try {
      const response = await $axios.post("/users", newUser);
      users.value.push(response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await $axios.put(`/users/${id}`, updatedUser);
      const index = users.value.findIndex((u) => u._id === id);
      if (index !== -1) {
        users.value[index] = response.data;
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await $axios.delete(`/users/${id}`);
      users.value = users.value.filter((u) => u._id !== id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return {
    users,
    user,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
  };
});
