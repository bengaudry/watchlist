import { getFirebaseDatabase } from "@/auth/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

// export type Watchlist = Array<{
//   movieId: string;
//   posterUrl: string;
//   addedBy: { userName: string; uid: string };
// }>;
// export type UserWatchlist = {
//   name: string;
//   listId: string;
//   content: Watchlist;
// };
// export type UserWatchlists = Array<UserWatchlist>;

// const watchlist: Watchlist = [
//   {
//     movieId: "tt1160419",
//     posterUrl:
//       "https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
//     addedBy: {
//       userName: "bengdry",
//       uid: "bengdry",
//     },
//   },
//   {
//     movieId: "tt1122523",
//     posterUrl:
//       "https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
//     addedBy: {
//       userName: "bengdry",
//       uid: "bengdry",
//     },
//   },
// ];

// /**
//  * Returns the details of a given watchlist (from list id)
//  */
// export async function fetchUserWatchlist(
//   uid: string,
//   listId: string
// ): Promise<UserWatchlist> {
//   const resultLists: Array<UserWatchlist> = [];
//   await fetchUserWatchlists(uid).then((lists) => {
//     lists.forEach((l) => {
//       if (l.listId === listId) {
//         resultLists.push(l);
//       }
//     });
//   });
//   return resultLists[0];
// }

// export async function fetchUserWatchlists(
//   uid: string
// ): Promise<UserWatchlists> {
//   return [{ name: "all", listId: "all000", content: watchlist }];
// }

// export async function deleteFromWatchlist(
//   uid: string,
//   movieId: string
// ): Promise<Watchlist> {
//   return watchlist.filter((val) => val.movieId != movieId);
// }

type WatchlistContentBase = {
  movieId: string;
  posterUrl?: string;
  addedBy?: { userName: string; uid: string };
  sublistsWithItem?: Array<string>;
};

export type WatchlistContent = Array<WatchlistContentBase>;

export type GlobalWatchlist = {
  id: string;
  ownerId: string;
  content: WatchlistContent;
};

export type Watchlist = GlobalWatchlist & {
  name: string;
  guests?: Array<{ userName: string; uid: string }>;
};

const GLOBAL_WATCHLIST_DB_NAME = "globalWatchlists";

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

export async function fetchUserGlobalWatchlist(
  uid: string
): Promise<GlobalWatchlist | null> {
  const docRef = doc(getFirebaseDatabase(), GLOBAL_WATCHLIST_DB_NAME, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
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
