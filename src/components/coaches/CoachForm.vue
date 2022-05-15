<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !firstname.isValid}">
            <label for="firstname">Firstname</label>
            <input  v-model.trim="firstname.val" type="text" id="firstname" @blur="clearValidity('firstname')" />
            <p v-if="!firstname.isValid">Firstname must not be empty</p>
        </div>

        <div class="form-control" :class="{invalid: !lastname.isValid}" >
            <label for="lastname">Lastname</label>
            <input  v-model.trim="lastname.val" type="text" id="lastname" @blur="clearValidity('lastname')" />
             <p v-if="!lastname.isValid">Lastname must not be empty</p>
        </div>

        <div class="form-control" :class="{invalid: !description.isValid}">
            <label for="description">Description</label>
            <textarea v-model.trim="description.val" rows="5" id="description" @blur="clearValidity('description')"></textarea>
              <p v-if="!description.isValid">Description must not be empty</p>
        </div>

        <div class="form-control" :class="{invalid: !rate.isValid}">
            <label for="rate">Hour Rate</label>
            <input v-model.number="rate.val" type="number" id="rate" @blur="clearValidity('rate')" />
            <p v-if="!rate.isValid">Rate must not be empty</p>
        </div>


        <div class="form-control" :class="{invalid: !areas.isValid}">
           <h2>Ares of Expertise</h2>
        <div>
            <input v-model="areas.val" type="checkbox" id="frontend" value="frontend" @blur="clearValidity('frontend')" />
            <label for="frontend"> Frontend Development</label>
        </div>

        <div>
            <input v-model="areas.val" type="checkbox" id="backend" value="backend" />
            <label for="backend"> Backend Development</label>
        </div>

        <div>
            <input v-model="areas.val" type="checkbox" id="career" value="career" />
            <label for="career"> Career Advisory</label>
        </div>
         <p v-if="!areas.isValid">At least one expertise should be selected</p>
        </div>

        <p v-if="!formIsValid">please fix the above errors and submit again</p>
        <base-button>Register</base-button>
    </form>
</template>

<script>
export default {
    emits: ['save-data'],
    data() {
        return {
            firstname: {
                val: '',
                isValid: true,
            },
            lastname: {
                val: '',
                isValid: true,
            },
            description: {
                val: '',
                isValid: true,
            },
            rate: {
                val: null,
                isValid: true,
            },
            areas: {
                val: [],
                isValid: true,
            },
            formIsValid: true,
        }
    },

    methods: {
        clearValidity(input) {
            this[input].isValid = true;
        },
        validateForm() {
            this.formIsValid = true;
            if(this.firstname.val == ''){
                this.firstname.isValid = false;
                this.formIsValid = false;
            }
            if(this.lastname.val == ''){
                this.lastname.isValid = false;
                this.formIsValid = false;
            }
            if(this.description.val == ''){
                this.description.isValid = false;
                this.formIsValid = false;
            }
            if(!this.rate.val || this.rate.val < 0){
                this.rate.isValid = false;
               this.formIsValid = false;
            }
             if(!this.areas.val.length === 0){
                this.areas.isValid = false;
                this.formIsValid = false;
            }
        },
        submitForm() {
            this.validateForm();

            if(!this.formIsValid){
                return;
            }
            const formData = {
                first: this.firstname.val,
                last: this.lastname.val,
                desc: this.description.val,
                rate: this.rate.val,
                areas: this.areas.val
            };
          
          this.$emit('save-data', formData);
        }
    }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>