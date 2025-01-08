<script setup>
import login from "@/utils/apiCalls/login.js";

const formFields = [
{
        name: "username",
        label: "Username",
        value: "nicolas",
        type: "text",
        placeholder: "Username",
        isValid: true,
    },
    {
        name: "password",
        label: "Password",
        value: "123456Aa",
        type: "password",
        placeholder: "Mot de passe",
        isValid: true,
    },
];

</script>

<template>
     <form
        @submit.prevent="
            () => {
                login(formFields[0].value, formFields[1].value);                
            }
        "
    >
        <div class="flex flex-col gap-6">
            <div v-for="(field, index) in formFields" :key="index">
                <label :for="field.name">{{ field.label }}</label>
                <input
                    :id="field.name"
                    :name="field.name"
                    v-model.type="field.value"
                    :type="field.type"
                    :placeholder="field.placeholder"
                    required
                />
            </div>
            <button type="submit" class="btn self-center">Se connecter</button>
        </div>
    </form>
</template>

<style scoped>
</style>