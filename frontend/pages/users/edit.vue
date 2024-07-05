<template>
  <div>
    <h1>Edit User</h1>
    <form @submit.prevent="updateUser">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <button type="submit">Update</button>
    </form>
    <NuxtLink to="/users">Back to User List</NuxtLink>
  </div>
</template>

<script setup>
const name = ref("");
const email = ref("");
const router = useRouter();
const route = useRoute();

const fetchUser = async () => {
  try {
    const config = useRuntimeConfig();
    const user = await $fetch(
      `${config.public.apiBaseUrl}/users/${route.params.id}`
    );
    name.value = user.name;
    email.value = user.email;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const updateUser = async () => {
  try {
    const config = useRuntimeConfig();
    await $fetch(`${config.public.apiBaseUrl}/users/${route.params.id}`, {
      method: "PUT",
      body: { name: name.value, email: email.value },
    });
    router.push("/users");
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

onMounted(fetchUser);
</script>
