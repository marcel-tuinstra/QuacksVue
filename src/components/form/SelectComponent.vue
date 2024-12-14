<template>
    <div class="relative" @click.stop="toggleDropdown">
        <label class="form-control w-full">
            <div class="label" v-if="label">
                <span class="label-text">
                    {{ label }} <sup class="fa-solid fa-asterisk text-error" v-if="isRequired"></sup>
                </span>
            </div>

            <div
                class="input input-ghost w-full cursor-pointer flex items-center justify-between"
                @click.stop="toggleDropdown"
                :class="{ 'bg-base-200': dropdownOpen }"
            >
                <span>
                    {{ selectedOption ? selectedOption.label : 'Select an option' }}
                </span>
                <i class="fa-solid fa-chevron-down"></i>
            </div>

            <div v-if="dropdownOpen" class="absolute z-10 w-full bg-base-100 border border-base-300 rounded-lg mt-1 shadow-lg">
                <input
                    ref="searchInput"
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search..."
                    class="input input-ghost w-full p-2 mb-2"
                    @click.stop
                />

                <div>
                    <div
                        v-for="option in filteredOptions"
                        :key="option.value"
                        @click.stop="selectOption(option)"
                        class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                        <i v-if="option.icon" class="w-6 me-1 fa-sm text-center fa-solid" :class="'fa-' + option.icon"></i>
                        <span>{{ option.label }}</span>
                    </div>
                </div>
            </div>
        </label>
    </div>
</template>

<script>
export default {
    name: 'CustomDropdown',
    props: {
        id: String,
        label: String,
        required: Boolean,
        disabled: Boolean,
        object: Object,
        options: Array,
    },
    data() {
        return {
            dropdownOpen: false,
            searchQuery: '',
            selectedValue: this.object[this.id] || '', // Ensure this captures the initial value correctly
        };
    },
    computed: {
        selectedOption() {
            return this.options.find(option => option.value === this.object[this.id]);
        },
        filteredOptions() {
            return this.options.filter(option =>
                option.label.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        isRequired() {
            return this.required === true;
        },
    },
    watch: {
        selectedValue(newValue) {
            this.$emit('input', newValue);
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
        // Ensure selectedValue is initialized correctly after component is mounted
        const initialOption = this.options.find(option => option.value === this.object[this.id]);
        if (initialOption) {
            this.selectedValue = initialOption.value;
        }
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        toggleDropdown() {
            if (!this.isDisabled) {
                this.dropdownOpen = !this.dropdownOpen;
                if (this.dropdownOpen) {
                    this.$nextTick(() => {
                        if (this.$refs.searchInput) {
                            this.$refs.searchInput.focus();
                        }
                    });
                }
            }
        },
        selectOption(option) {
            this.selectedValue = option.value;
            this.object[this.id] = this.selectedValue;
            this.dropdownOpen = false;
            this.$emit('input', this.selectedValue);
            this.$emit('onChange');
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.dropdownOpen = false;
            }
        },
    }
}
</script>