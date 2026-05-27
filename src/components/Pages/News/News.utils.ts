import news1 from "../../../../public/news-1.webp";
import news2 from "../../../../public/news-2.webp";
import news3 from "../../../../public/news-3.webp";
import news4 from "../../../../public/news-4.webp";
import news5 from "../../../../public/news-5.webp";

export type NewsType = {
  id: number;
  titleKey: string;
  textKey: string;
  dateKey: string;
  image: string;
  typeKey: string;
};

const news: NewsType[] = [
  {
    id: 1,
    titleKey: "news.items.1.title",
    textKey: "news.items.1.text",
    dateKey: "news.items.1.date",
    image: `${news1}`,
    typeKey: "news.types.announcements",
  },
  {
    id: 2,
    titleKey: "news.items.2.title",
    textKey: "news.items.2.text",
    dateKey: "news.items.2.date",
    image: `${news2}`,
    typeKey: "news.types.rankings",
  },
  {
    id: 3,
    titleKey: "news.items.3.title",
    textKey: "news.items.3.text",
    dateKey: "news.items.3.date",
    image: `${news3}`,
    typeKey: "news.types.top",
  },
  {
    id: 4,
    titleKey: "news.items.4.title",
    textKey: "news.items.4.text",
    dateKey: "news.items.4.date",
    image: `${news4}`,
    typeKey: "news.types.announcements",
  },
   {
    id: 5,
    titleKey: "news.items.5.title",
    textKey: "news.items.5.text",
    dateKey: "news.items.5.date",
    image: `${news5}`,
    typeKey: "news.types.announcements",
  },
];

export default news;