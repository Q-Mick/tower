import { reactive } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/TowerEvent.js').TowerEvents[]||null} */
  events: [],
  activeEvent: null,

  /** @type {import('./models/Ticket.js').Ticket[]} */
  Tickets: [],
  
  /** @type {import('./models/Comment.js').Comment[]} */
  comments:[],
  activeComment: null
});
