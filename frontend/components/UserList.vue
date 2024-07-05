<!-- frontend/components/UserList.vue -->
<template>
  <div class="user-list-container">
    <h1>User List</h1>
    <NuxtLink class="create-user-link" to="/users/create"
      >Create New User</NuxtLink
    >
    <table v-if="userStore.users && userStore.users.length" class="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userStore.users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <NuxtLink :to="`/users/edit/${user._id}`" class="edit-link"
              >Edit</NuxtLink
            >
            <button @click="deleteUser(user._id)" class="delete-button">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No users available.</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();

const deleteUser = async (id) => {
  await userStore.deleteUser(id);
};

onMounted(() => {
  userStore.fetchUsers();
});
</script>

<style scoped>
.user-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.create-user-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #007bff;
  text-decoration: none;
}

.create-user-link:hover {
  text-decoration: underline;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.user-table th {
  background-color: #f2f2f2;
}

.edit-link {
  color: #007bff;
  margin-right: 10px;
  text-decoration: none;
}

.edit-link:hover {
  text-decoration: underline;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #e60000;
}
</style>
