export type WatchlistContentBase = {
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

export const GLOBAL_WATCHLIST_DB_NAME = "globalWatchlists";

export * from "./watchlist/setters";
export * from "./watchlist/getters";
