<template>
  <UserList :users="users" @delete="handleDelete" />
</template>

<script setup>
const users = ref([]);

const fetchUsers = async () => {
  try {
    const config = useRuntimeConfig();
    users.value = await $fetch(`${config.public.apiBaseUrl}/users`);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const handleDelete = async (id) => {
  try {
    const config = useRuntimeConfig();
    await $fetch(`${config.public.apiBaseUrl}/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

onMounted(fetchUsers);
</script>
