const store = require("./app/store");
const { cakeActions } = require("./feature/cake/cake-slice");
const { icecreamActions } = require("./feature/ice-cream/ice-cream-slice");
const { fetchUsers } = require("./feature/users/users-slice");

const unsubscribe = store.subscribe(() => {
  console.log("updated state", store.getState());
});

// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());
// store.dispatch(cakeActions.ordered());

// store.dispatch(icecreamActions.ordered());
// store.dispatch(icecreamActions.ordered());

// store.dispatch(cakeActions.restocked(3));
// store.dispatch(icecreamActions.restocked(2));

store.dispatch(fetchUsers());

// unsubscribe();
