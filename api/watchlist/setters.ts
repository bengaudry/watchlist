import { getFirebaseDatabase } from "@/auth/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  fetchUserWatchlists,
  GLOBAL_WATCHLIST_DB_NAME,
  WatchlistContentBase,
} from "../userWatchlist";
import { ActionSheetIOS, Alert } from "react-native";

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

export async function askChooseWatchlist(uid: string) {
  try {
    const lists = await fetchUserWatchlists(uid);
    return new Promise<string | null>((resolve, reject) => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: "Select a specific watchlist",
          options: [...lists.map((l) => l.name), "Close"],
          cancelButtonIndex: lists.length,
        },
        (btnIdx) => {
          if (btnIdx !== lists.length) {
            resolve(lists[btnIdx].id);
          } else {
            resolve(null); // Retourne null si l'utilisateur a choisi "Close"
          }
        }
      );
    });
  } catch (err) {
    return null;
  }
}

export async function addToWatchlist(
  uid: string,
  listId: string,
  movie: WatchlistContentBase
) {
  // Updates specific watchlist
  updateDoc(doc(getFirebaseDatabase(), "watchlists", listId), {
    content: arrayUnion(movie),
  });

  // Updates global watchlist
  updateDoc(doc(getFirebaseDatabase(), GLOBAL_WATCHLIST_DB_NAME, uid), {
    content: arrayUnion(movie),
  });
}
