<!-- frontend/pages/users/create.vue -->
<template>
  <div>
    <h1>Create User</h1>
    <UserForm @submit="handleCreate" />
    <NuxtLink to="/users">Back to User List</NuxtLink>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import UserForm from "~/components/UserForm.vue";
import { useUserStore } from "~/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const handleCreate = async () => {
  await userStore.createUser(userStore.user);
  router.push("/users");
};
</script>
