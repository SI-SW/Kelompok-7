import { defineStore } from 'pinia';

import * as s$todo from '@/services/dashboard/todo';

const d$todo = defineStore({
    id: 'todo',
    state: () => ({
        list: [],
    }),
    actions: {
        async a$list() {
            try {
                const { data } = await s$todo.list();
                this.list = data;
            } catch (e) {
                console.error('actions todo list error', e);
                throw e;
            }
        },
        async a$add(body) {
            try {
              await s$todo.add(body);
            } catch (e) {
              console.error('actions todo add error', e);
              throw e;
            }
        },
        async a$delete(body) {
            try {
              await s$todo.delete(body);
            } catch (e) {
              console.error('actions todo add error', e);
              throw e;
            }
        },
    },
    getters: {
        g$list: ({ list }) => list,
    },
})

export default d$todo;