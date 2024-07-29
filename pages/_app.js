import "../styles/globals.css";
import Head from "next/head";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import user from "../reducers/user";
import tweet from "../reducers/tweet";

const backendURL = "https://hackatweet-backend-hazel.vercel.app";

const reducers = combineReducers({ user, tweet });
const persistConfig = { key: "hackatweet", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Hackatweet</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export { backendURL };
export default App;
