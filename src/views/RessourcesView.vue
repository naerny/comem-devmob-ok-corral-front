<script setup>
// filepath: /Users/nicolas/Library/CloudStorage/OneDrive-HESSO/cours/semestre_05/dev_mobile/ok-corral-front/src/views/RessourcesView.vue
import { onMounted, ref, computed } from 'vue';
import { getSessions } from '@/utils/apiCalls/sessionGet.js';
import { getUsers } from '@/utils/apiCalls/userGet.js';
import { getGames } from '@/utils/apiCalls/gameGet.js';

const ressources = ref([]);
const selectedTypes = ref([]); // Initialize as an empty array
const currentPage = ref(1);
const itemsPerPage = ref(20);


onMounted(() => {
    Promise.all([getSessions(), getUsers(), getGames()]).then(([sessions, users, games]) => {
        const sessionsWithType = sessions.map(session => ({
            ...session,
            type: 'session'
        }));
        const usersWithType = users.map(user => ({
            ...user,
            type: 'user'
        }));
        const gamesWithType = games.map(game => ({
            ...game,
            type: 'game'
        }));
        ressources.value = [...sessionsWithType, ...usersWithType, ...gamesWithType];
    });
});

const filteredRessources = computed(() => {
    if (selectedTypes.value.length === 0) {
        return ressources.value;
    }
    return ressources.value.filter(resource => selectedTypes.value.includes(resource.type));
});

const paginatedRessources = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredRessources.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(filteredRessources.value.length / itemsPerPage.value);
});

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-EN', options);
};

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
</script>

<template>
    <h1>Ressources</h1>
    <div class="component-container">        
        <div class="filter">
            <h3>Filters</h3>
            <div class="filter-items">
                <label>
                    <input type="checkbox" value="session" v-model="selectedTypes" />
                    Sessions
                </label>
                <label>
                    <input type="checkbox" value="user" v-model="selectedTypes" />
                    Users
                </label>
                <label>
                    <input type="checkbox" value="game" v-model="selectedTypes" />
                    Games
                </label>
            </div>
        </div>
        <ul class="listContainer">
            <li class="listItem" v-for="(resource, index) in paginatedRessources" :key="index">

                <div class="listItem__content" v-if="resource.type === 'session'">
                    <div class="header">
                        <strong>{{ resource.type }}</strong>
                    </div>
                    <div class="content">
                        <div>
                            <p><strong>Created by</strong><br>
                                {{ resource.user.username }}
                            </p>
                        </div>
                        <div>
                            <p><strong>Created at</strong><br>
                                {{ formatDate(resource.created_at) }}
                            </p>

                        </div>
                    </div>
                </div>

                <div class="listItem__content" v-else-if="resource.type === 'user'">
                    <div class="header">
                        <strong>{{ resource.type }}</strong>
                    </div>
                    <div class="content">
                        <div>
                            <p><strong>Username</strong><br>
                                {{ resource.username }}
                            </p>
                        </div>
                        <div>
                            <p><strong>Email</strong><br>
                                {{ resource.email }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="listItem__content" v-else-if="resource.type === 'game'">
                    <div class="header">
                        <strong>{{ resource.type }}</strong>
                    </div>
                    <div class="content">
                        <div>
                            <p><strong>Game id</strong><br>
                                {{ resource._id }}
                            </p>
                        </div>
                        <div>
                            <p><strong>Created at</strong><br>
                                {{ resource.created_at }}
                            </p>
                        </div>
                    </div>
                </div>

            </li>
        </ul>

        <div class="pagination">
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.filter {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    /* gap: 1rem; */

    .filter-items {
        display: flex;
        gap: 1rem;
    }

    input {
        min-height: 1rem;
        margin: 0;
        margin-right: .25rem;
    }

    label {
        display: flex;
        font-size: 1rem;
        font-weight: normal;
    }
}

.listContainer {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.listItem {
    border-top: 1px solid var(--gray);
    padding-top: .5rem;

    &__content {
        display: flex;
        gap: 2rem;
    }

    .content {
        display: flex;
        gap: 1rem;

        div {
            min-width: 250px;
        }
    }

    .header {
        min-width: 150px;
        display: flex;
        text-transform: capitalize;
    }

    p {
        text-align: left;
        margin: 0;
    }
}

.pagination {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    align-items: center;

    button {
        margin-top: 0;
    }
}

/* Add your styles here */
</style>