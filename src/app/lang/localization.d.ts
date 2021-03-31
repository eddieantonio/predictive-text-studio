export default interface Localization {
  [key: string]: Category;
}

interface Category {
  [key: string]: Translation | Category;
}

type Translation = string;
