import { getFirebaseDatabase } from "@/auth/firebase";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { GLOBAL_WATCHLIST_DB_NAME, GlobalWatchlist, initializeUserGlobalWatchlist, Watchlist } from "../userWatchlist";

export async function fetchUserGlobalWatchlist(
  uid: string
): Promise<GlobalWatchlist | null> {
  const docRef = doc(getFirebaseDatabase(), GLOBAL_WATCHLIST_DB_NAME, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as GlobalWatchlist;
  }
  await initializeUserGlobalWatchlist(uid);
  return { id: "global", ownerId: uid, content: [] };
}

export async function fetchUserWatchlists(uid: string) {
  const q = query(
    collection(getFirebaseDatabase(), "watchlists"),
    where("ownerId", "==", uid)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    const results: Watchlist[] = [];
    querySnapshot.forEach((doc) =>
      results.push({ ...(doc.data() as Watchlist), id: doc.id })
    );
    return results;
  } else {
    throw new Error("Couldn't fetch watchlist");
  }
}

export async function fetchUserWatchlist(
  uid: string,
  listId: string
): Promise<Watchlist> {
  const docRef = doc(getFirebaseDatabase(), "watchlists", listId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...(docSnap.data() as Watchlist), id: docSnap.id };
  } else {
    throw new Error("Couldn't fetch watchlist");
  }
}
