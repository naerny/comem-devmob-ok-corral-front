<script setup>
import {sessionValidateCode} from '@/utils/apiCalls/sessionValidateCode.js';

const formFields = [
{
        name: "Session_code",
        label: "Session Code",
        value: "",
        type: "number",
        placeholder: "129650",
        isValid: true,
    },
];

</script>

<template>
     <form
        @submit.prevent="
            () => {
                // login(formFields[0].value);                
                sessionValidateCode(formFields[0].value);
            }
        "
    >
        <div class="flex flex-col gap-6">
            <div v-for="(field, index) in formFields" :key="index">
                <label :for="field.name">{{ field.label }}</label>
                <input :id="field.name" :name="field.name" v-model.type="field.value" :type="field.type"
                    :placeholder="field.placeholder" required />
            </div>
            <button type="submit" class="btn self-center">Join session</button>
        </div>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    text-align: center;
}

input {
    padding: 0.5rem;
    margin: 3px 5px;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
}
</style>