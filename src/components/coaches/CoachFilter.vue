<template>
    <base-card>
        <h2>Find Your Coach</h2>
        <span class="filter-option">
            <input @change="setFilter" type="checkbox" id="frontend" checked />
            <label for="frontend">Frontend</label>

             <input  @change="setFilter" type="checkbox" id="backend" checked />
            <label for="backed">Backend</label>

             <input  @change="setFilter" type="checkbox" id="career" checked />
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script>
export default {
    emits: ['change-filter'],
    data() {
        return {
            filters: {
                frontend: true,
                backend: true,
                career: true,
            }
        };
    },

    methods: {
        setFilter(event) {
            const inputId = event.target.id;
            const isActive = event.target.checked;
            const updatedFilters = {
                //Copy the filters to updatedFilters
                ...this.filters, 
                //Overwrite the inputId event
                [inputId]: isActive
            };
            this.filters = updatedFilters;
            //Communicate back to the parent using the emit
            
            this.$emit('change-filter', updatedFilters);
        }
    }
}
</script>


<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>