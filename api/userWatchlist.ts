const watchlist = ["tt1160419"];

export type Watchlist = Array<string>;
export type UserWatchlist = {
  name: string;
  listId: string;
  content: Watchlist;
};
export type UserWatchlists = Array<UserWatchlist>;

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
  return watchlist.filter((val) => val != movieId);
}
