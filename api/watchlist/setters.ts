import { getFirebaseDatabase } from "@/auth/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { GLOBAL_WATCHLIST_DB_NAME } from "../userWatchlist";

export async function initializeUserGlobalWatchlist(
  uid: string
): Promise<void> {
  const docRef = doc(getFirebaseDatabase(), GLOBAL_WATCHLIST_DB_NAME, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    throw new Error("Global watchlist already exists");
  }

  try {
    await setDoc(doc(getFirebaseDatabase(), GLOBAL_WATCHLIST_DB_NAME, uid), {
      content: [],
    });
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function createWatchlist(
  uid: string,
  watchlist: { name: string }
) {
  return await addDoc(collection(getFirebaseDatabase(), "watchlists"), {
    ownerId: uid,
    content: [],
    guests: [],
    ...watchlist,
  });
}
