<template>
  <div>
    <login />
  </div>
</template>

<script>
// @ is an alias to /src
import login from "../components/login";

export default {
  name: "Home",
  components: {
    login,
  },
};
</script>
