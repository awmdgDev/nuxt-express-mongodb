<!-- frontend/components/UserForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name:</label>
      <input type="text" v-model="localUser.name" id="name" required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" v-model="localUser.email" id="email" required />
    </div>
    <button type="submit">{{ user._id ? "Update" : "Create" }}</button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { useUserStore } from "~/stores/userStore";

const props = defineProps({
  user: {
    type: Object,
    default: () => ({ name: "", email: "" }),
  },
});

const emits = defineEmits(["submit"]);
const userStore = useUserStore();
const localUser = ref({ ...props.user });

watch(
  () => props.user,
  (newUser) => {
    localUser.value = { ...newUser };
  },
  { immediate: true, deep: true }
);

const handleSubmit = async () => {
  if (props.user._id) {
    await userStore.updateUser(props.user._id, localUser.value);
  } else {
    await userStore.createUser(localUser.value);
  }
  emits("submit");
};
</script>
