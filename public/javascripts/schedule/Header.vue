<template>
    <header class="header">
        <p>Пользователь: {{ user.login }}</p>
        <button class="exit-btn">Выйти</button>
    </header>
</template>

<script>
    export default {
        name: "Header.vue",
        data() {
            return {
                user: JSON.parse(localStorage.user)
            }
        }
    }
</script>

<style scoped>
    header {
        width: 100%;
        height: 2vw;
    }

    p {

    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3vw;
        height: 1.2vw;
        border-radius: 5px;
    }
</style>