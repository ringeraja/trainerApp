<template>
<div>
  <h2>{{ userName }}</h2>
  <h3>{{ age }}</h3>
</div>
</template>

<script>
import { computed, inject } from 'vue';

export default {
  props: ['firstName', 'lastName',],
  setup(props, context) {
    const uName = computed(function () {
      return props.firstName + ' ' + props.lastName;
    });

    const age = inject('user-age');  // age is also a ref beacause we provided a ref

    //age.value = 32; should not change like this

    console.log(context);

    return { userName: uName,age };
  },
  // computed: {
  //     userName(){
  //         return this.firstName + ' ' + this.lastName;
  //     }
  // }
};
</script>
