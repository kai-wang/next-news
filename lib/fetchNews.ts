import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
    category?: Category | string, 
    keywords?: string, 
    isDynamic? :boolean) => {
  //
  const query = gql`
  query MyQuery(
    $access_key: String!
    $categories: String!
    $keywords: String
  ) {
    myQuery(
      access_key: $access_key
      categories: $categories 
      countries: "gb"
      sort: "published_desc"
      keywords: $keywords
      ) {
      data {
        author
        country
        description
        category
        image
        language
        url
        title
        source
        published_at
      }
      pagination {
        count
        limit
        total
        offset
      }
    }
  }  
  `;

  const res = await fetch('https://happyvalley.stepzen.net/api/dozing-swan/__graphql', {
    method: 'POST',
    cache: isDynamic ? "no-cache" : "default",
    next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
    },
    body: JSON.stringify({
      query,
      variables: {
        access_key: process.env.MEDIASTACK_API_KEY,
        categories: category,
        keywords: keywords,
      }
    })
  });

  console.log(category, keywords);

  const newsResponse = await res.json();

  const news = sortNewsByImage(newsResponse.data.myQuery);
  return news;
};

export default fetchNews;