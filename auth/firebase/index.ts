import { initializeApp, getApps, getApp } from "firebase/app";
import { NextOrObserver, User } from "firebase/auth";
import { getFirebaseConfig } from "./config";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  onAuthStateChanged,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";

let app;
export function getFirebaseApp() {
  if (getApps().length === 0) {
    app = initializeApp(getFirebaseConfig());
  } else {
    app = getApp();
  }
  return app;
}

const AUTH = initializeAuth(getFirebaseApp(), {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export function getFirebaseAuth() {
  return AUTH;
}
const getIsSignedIn = () => Boolean(getFirebaseAuth().currentUser);
const getCurrentUser = () => getFirebaseAuth().currentUser;
const signOut = () => getFirebaseAuth().signOut();
const onAuthStateChange = (fun: NextOrObserver<User>) =>
  onAuthStateChanged(getFirebaseAuth(), fun);

export { getIsSignedIn, signOut, onAuthStateChange, getCurrentUser };
