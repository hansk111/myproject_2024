import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import counterReducer from "./counter/counterSlice";
import CustomizerReducer from "./customizer/CustomizerSlice";
import EcommerceReducer from "./apps/eCommerce/ECommerceSlice";
import ChatsReducer from "./apps/chat/ChatSlice";
import NotesReducer from "./apps/notes/NotesSlice";
import EmailReducer from "./apps/email/EmailSlice";
import TicketReducer from "./apps/tickets/TicketSlice";
import ContactsReducer from "./apps/contacts/ContactSlice";
import UserProfileReducer from "./apps/userProfile/UserProfileSlice";
import BlogReducer from "./apps/blog/BlogSlice";

import authReducer from "./auth/authSlice";
import { apiSlice } from "./services/apiSlice";
import WeightReducer from "./apps/weight/WeightSlice";
import LocationReducer from "./apps/location/LocationSlice"
import { weatherApi } from "./services/weatherService";


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customizer: CustomizerReducer,
    ecommerceReducer: EcommerceReducer,
    // chatReducer: ChatsReducer,
    emailReducer: EmailReducer,
    // notesReducer: NotesReducer,
    contactsReducer: ContactsReducer,
    ticketReducer: TicketReducer,
    userpostsReducer: UserProfileReducer,
    // blogReducer: BlogReducer,
    auth: authReducer,
    chat: ChatsReducer,
    notes: NotesReducer,
    blog: BlogReducer,
    weight: WeightReducer,
    location: LocationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, weatherApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

const rootReducer = combineReducers({
  counter: counterReducer,
  customizer: CustomizerReducer,
  ecommerceReducer: EcommerceReducer,
  // chatReducer: ChatsReducer,
  emailReducer: EmailReducer,
  // notesReducer: NotesReducer,
  contactsReducer: ContactsReducer,
  ticketReducer: TicketReducer,
  userpostsReducer: UserProfileReducer,
  // blogReducer: BlogReducer,
  auth: authReducer,
  chat: ChatsReducer,
  notes: NotesReducer,
  blog: BlogReducer,
  weight: WeightReducer,
  location: LocationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
