import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { Auth, NextOrObserver, User } from "firebase/auth";
import { getFirebaseConfig } from "./config";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  onAuthStateChanged,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

// APP
export const getFirebaseApp = (): FirebaseApp =>
  getApps().length > 0 ? getApp() : initializeApp(getFirebaseConfig());

// AUTH
const AUTH = initializeAuth(getFirebaseApp(), {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const getFirebaseAuth = (): Auth => AUTH;

// FIRESTORE
const DB = getFirestore(getFirebaseApp());
export const getFirebaseDatabase = (): Firestore => DB;

// METHODS
const getIsSignedIn = () => Boolean(getFirebaseAuth().currentUser);
const getCurrentUser = () => getFirebaseAuth().currentUser;
const signOut = () => getFirebaseAuth().signOut();
const onAuthStateChange = (fun: NextOrObserver<User>) =>
  onAuthStateChanged(getFirebaseAuth(), fun);

export { getIsSignedIn, signOut, onAuthStateChange, getCurrentUser };
