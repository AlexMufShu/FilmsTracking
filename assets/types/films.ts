export interface Films {
  title: string,
  release_date: string,
  watched?: boolean,
  rating?: number,
  url: string,
  link?: string
}

export interface FilmFromList {
  title: string,
  episode_id: number,
  opening_crawl: string,
  director?: string,
  producer?: string,
  release_date: string,
  characters: [],
  country?: string,
  duration?: number,
  rating?: number,
  watched?: boolean,
  genre?: []
}
