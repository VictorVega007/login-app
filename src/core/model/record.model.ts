export interface RecordModel {
  id: number;
  title: string;
  artist_display?: string;
  artist_title?: string;
  image_id?: string;
  alt_image_ids?: string[];
  artwork_type_title: string;
  place_of_origin: string;
  short_description: string;
  classification_titles: string[];
  date_display: string;
}
