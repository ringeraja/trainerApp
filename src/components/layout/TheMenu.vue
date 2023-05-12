<template>
<div>
  <div class="holder">
    <div>
        <h2>Composition API Practise</h2>
        <user-data :last-name="lastName" :first-name="firstName"></user-data>
    </div>
    <div>
      <input class='input' type="text" placeholder="First name" v-model="firstName">
      <input class='input' type="text" placeholder="Last name" ref="lastNameInput">
      <button @click="setLastName">Set last name</button>
    </div>
    <div class="card">
      <h2>{{ user.name }}</h2>
      <h2>{{ user.age }}</h2>
    </div>
    <button @click="setAge">Change Age</button>
  </div>
  <div class="holder">
    <div>
        <h2>My Course Goal</h2>
        <!-- Task 1: Output your main course goal with help of the composition API -->
        <!-- Don't hardcode it into the template, instead hardcode it into the JS code -->
        <h3 v-if="reactiveCourseData.goalVisibility">{{goal}}</h3>
        <!-- Task 2: Toggle (show/ hide) the goal with help of the button  -->
        <button @click="toggleGoalVisibility">Toggle Goal</button>
        <!-- Task 3: Manage data in three ways -->
        <!-- => Separate refs -->
        <!-- => Ref Object -->
        <!-- => Reactive Object -->
        <!-- Task 4: Also solve the assignment with the Options API -->
    </div>
  </div>
  <exercise-cmp></exercise-cmp>
</div>

</template>

<script>
//ref works with all kinds of values including objects with .value accessing
import { reactive,ref,computed,watch, provide } from 'vue'; // reactive - is there for objects
import UserData from '../../components/layout/UserData.vue';
export default {
  components: {
    UserData,
  },
  setup() {
    const uAge = ref(44);
    const user = reactive({
      name: 'Nikola',
      age: 26,
    });
    const lastNameInput = ref(null);

     const reactiveCourseData = reactive({
      goal:'Finish the course.Learn vue basics!',
      goalVisibility: false,
    });

    const firstName = ref('');
    const lastName = ref('');

    provide('user-age',uAge);//since we provide a ref it will be updated on change

    const uName = computed(function(){//whenever firstName and lastName change it autoupdates
        return firstName.value + ' ' + lastName.value;
    });


    watch([uAge,uName],function( newValue,oldValues){
      console.log('Old age: ' + oldValues[0]);
      console.log('New age: ' + newValue[0]);
      console.log('Old name: ' + oldValues[1]);
      console.log('New name: ' + newValue[1]);
    });
    
    //const courseGoal = ref('Learn vue.js basics!'); 
    //const goalIsVisible= ref(false);
    // const courseData = ref({
    //   goal:'Finish the course.Learn vue basics!',
    //   goalVisibility: false,
    // });
    //console.log(isRef(uAge.value));
    //console.log(isReactive(user.name), user.age);

    setTimeout(function () {
      user.name = 'Max ';
      user.age = 33;
    }, 3500);

    function setNewAge() {
      user.age = 72;
      uAge.value =72;
    }

    function toggleGoalVisibility(){
      //courseData.value.goalVisibility = !courseData.value.goalVisibility;
      reactiveCourseData.goalVisibility = !reactiveCourseData.goalVisibility;
    }
    
    function setLastName(){
      //lastName.value = this.$refs.lastNameInput.value;
      lastName.value = lastNameInput.value.value;    
    }

    

    //const userRefs = toRefs(user);

    return {
      user,
      userName:uName,
      age:uAge,
      //userName: userRefs.name,
      //userAge: userRefs.age,
      setAge: setNewAge,
      goal: reactiveCourseData.goal, //would not be reactive
      reactiveCourseData,
      toggleGoalVisibility,
      firstName,
      lastName,
      lastNameInput,
      setLastName

    }; 
  },
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
  max-width: 60rem;
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

/* input CSS */

.input {
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.input:focus {
  border: 2px solid var(--input-focus);
}
</style>
