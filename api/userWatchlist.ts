export type Watchlist = Array<{
  movieId: string;
  posterUrl: string;
  addedBy: { userName: string; uid: string };
}>;
export type UserWatchlist = {
  name: string;
  listId: string;
  content: Watchlist;
};
export type UserWatchlists = Array<UserWatchlist>;

const watchlist: Watchlist = [
  {
    movieId: "tt1160419",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    addedBy: {
      userName: "bengdry",
      uid: "bengdry",
    },
  },
  {
    movieId: "tt1122523",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    addedBy: {
      userName: "bengdry",
      uid: "bengdry",
    },
  },
];

/**
 * Returns the details of a given watchlist (from list id)
 */
export async function fetchUserWatchlist(
  uid: string,
  listId: string
): Promise<UserWatchlist> {
  const resultLists: Array<UserWatchlist> = [];
  await fetchUserWatchlists(uid).then((lists) => {
    lists.forEach((l) => {
      if (l.listId === listId) {
        resultLists.push(l);
      }
    });
  });
  return resultLists[0];
}

export async function fetchUserWatchlists(
  uid: string
): Promise<UserWatchlists> {
  return [{ name: "all", listId: "all000", content: watchlist }];
}

export async function deleteFromWatchlist(
  uid: string,
  movieId: string
): Promise<Watchlist> {
  return watchlist.filter((val) => val.movieId != movieId);
}
