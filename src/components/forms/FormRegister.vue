<script setup>
import register from "@/utils/apiCalls/register.js";

const formFields = [
    {
        name: "username",
        label: "Username",
        value: "usertest1",
        type: "text",
        placeholder: "Username",
        isValid: true,
    },
    {
        name: "email",
        label: "Email",
        value: "mail@mail.ch",
        type: "email",
        placeholder: "Email Address",
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
    <form @submit.prevent="() => {
        register(formFields[0].value, formFields[1].value, formFields[2].value);
    }
        ">
        <div class="flex flex-col gap-6">
            <div v-for="(field, index) in formFields" :key="index">
                <label :for="field.name">{{ field.label }}</label>
                <input :id="field.name" :name="field.name" v-model="field.value" :type="field.type"
                    :placeholder="field.placeholder" required />
            </div>
            <button type="submit" class="btn self-center">S'inscrire</button>
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