import { reactive } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/TowerEvent.js').TowerEvents[]||null} */
  events: [],
  activeEvent: null,
  isCreator: null,

  /** @type {import('./models/Tickets.js').Ticket[]} */
  tickets: [],
  
  /** @type {import('./models/Comment.js').Comment[]} */
  comments:[],
  activeComment: null
});
