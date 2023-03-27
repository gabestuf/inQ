export interface FilterInfo {
  hidePrivate: boolean;
  page: number;
  titleFilter: string;
  ownerFilter: string;
}

export interface SurveyInfo {
  title: string;
  description: string;
  _id: string;
  owner: string;
  isPrivate: boolean;
}
