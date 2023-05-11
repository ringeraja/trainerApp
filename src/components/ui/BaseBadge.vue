<template>
    <span class="badge" :class="type">
        {{text}}
    </span>
</template>

<script>
export default{
    props: ['type','title'],
    computed: {
        text(){
            return this.title.toUpperCase();
        }
    }
}//by binding type to class we set badge themes using the bellow classes passed with type="frontend"
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #264653;
  color: white;
}

.backend {
  background-color: #2a9d8f;
  color: white;
}

.career {
  background-color: #ffbe0b;
  color: white;
}
</style>