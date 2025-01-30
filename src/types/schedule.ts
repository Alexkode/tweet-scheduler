export interface MediaInfo {
  media_url: string;
  downloaded_filepath: string;
}

export interface Post {
  content?: string;
  imageInfo?: MediaInfo[];
  videoInfo?: MediaInfo[];
}