<template>
  <div class="holder">
    <div>
        <h2>Composition API Practise</h2>
        <p>{{ username }}</p>
        <p>{{ userage }}</p>
    </div>
    <div class="card">
      <h2>{{ user.name }}</h2>
      <h2>{{ user.age }}</h2>
    </div>
    <button @click="setAge">Change Age</button>
  </div>
</template>

<script>
//composition api
//import { ref } from 'vue'; //ref works with all kinds of values including objects with .value accessing
import { reactive,ref } from 'vue'; // reactive - is there for objects

export default {
  //props: untouched
  //components: untouched
  setup() {
    //const uName = ref('Nikola Vujicic'); //creates a reactive value, that vue is able to watch and update DOM when value is changed or used
    const uName = ref('Tom');
    const uAge = ref(44);
    const user = reactive({
      name: 'Nikola',
      age: 26,
    });

    //console.log(isRef(uAge.value));
    //console.log(isReactive(user.name), user.age);

    setTimeout(function () {
      user.name = 'Max';
      user.age = 77;
    }, 3500);

    function setNewAge() {
      uAge.value = 33;
    }

    //const userRefs = toRefs(user);

    return {
      user: user,
      username:uName,
      userage:uAge,
      //userName: userRefs.name,
      //userAge: userRefs.age,
      setAge: setNewAge,
      
    }; 
  },

  // data(){
  //     return{
  //         userName: 'Nikola',
  //     };
  // },
};
</script>

<style scoped>
.holder {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 42rem;
}

.card {
  width: 190px;
  height: 254px;
  background: #07182e;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 20px;
  margin-right: 3rem;
}

.card h2 {
  z-index: 1;
  color: white;
  font-size: 2em;
}

.card::before {
  content: '';
  position: absolute;
  width: 100px;
  background-image: linear-gradient(180deg, #00b7ff, rgb(255, 48, 255));
  height: 130%;
  animation: rotBGimg 3s linear infinite;
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card::after {
  content: '';
  position: absolute;
  background: #07182e;
  inset: 5px;
  border-radius: 15px;
}
/*  */

/* Button CSS */
button {
  position: relative;
  padding: 10px 20px;
  border-radius: 7px;
  border: 1px solid rgb(61, 106, 255);
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 2px;
  background: transparent;
  color: #00b7ff;
  overflow: hidden;
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

button:hover {
  background: rgb(61, 106, 255);
  box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

button:hover::before {
  -webkit-animation: sh02 0.5s 0s linear;
  -moz-animation: sh02 0.5s 0s linear;
  animation: sh02 0.5s 0s linear;
}

button::before {
  content: '';
  display: block;
  width: 0px;
  height: 86%;
  position: absolute;
  top: 7%;
  left: 0%;
  opacity: 0;
  background: #fff;
  box-shadow: 0 0 50px 30px #fff;
  -webkit-transform: skewX(-20deg);
  -moz-transform: skewX(-20deg);
  -ms-transform: skewX(-20deg);
  -o-transform: skewX(-20deg);
  transform: skewX(-20deg);
}

@keyframes sh02 {
  from {
    opacity: 0;
    left: 0%;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0;
    left: 100%;
  }
}

button:active {
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: box-shadow 0.2s ease-in;
  -moz-transition: box-shadow 0.2s ease-in;
  transition: box-shadow 0.2s ease-in;
}
/* Button CSS */
</style>
