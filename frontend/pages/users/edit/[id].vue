<template>
  <div>
    <h1>Edit User</h1>
    <UserForm :user="userStore.user" @submit="handleUpdate" />
    <NuxtLink to="/users">Back to User List</NuxtLink>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const handleUpdate = async () => {
  await userStore.updateUser(route.params.id, userStore.user);
  router.push("/users");
};

onMounted(() => {
  userStore.fetchUserById(route.params.id);
});
</script>
