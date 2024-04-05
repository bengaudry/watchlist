const watchlist = ["dune"];

export type Watchlist = Array<string>;
export type UserWatchlists = Array<{
  name: string;
  listId: string;
  content: Watchlist;
}>;

export async function fetchUserWatchlist(uid: string): Promise<Watchlist> {
  return watchlist;
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
