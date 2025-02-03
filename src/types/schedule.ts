export interface MediaInfo {
  media_url: string;
  downloaded_filepath: string;
}

export interface Post {
  content?: string;
  image_info?: MediaInfo[];
  video_info?: MediaInfo[];
  scheduled_date: string;
  user_id: string;
}