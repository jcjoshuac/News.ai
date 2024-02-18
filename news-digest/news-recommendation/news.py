# NewsAPI: 81b0c82b-624f-4eea-8ccd-43c53036beff

from eventregistry import *

er = EventRegistry(apiKey = '81b0c82b-624f-4eea-8ccd-43c53036beff')
USER_PREFERENCE = "Travel"

def recommend_news(user_preference):
    # manually create a new topic page
    topic = TopicPage(er)

    if(er.getCategoryUri(user_preference) != None):
        topic.addCategory(er.getCategoryUri(user_preference), 50)
    elif(er.getConceptUri(user_preference) != None):
        topic.addConcept(er.getConceptUri(user_preference), 50)
    else:
        topic.addKeyword(user_preference, 50)

    # skip articles that are duplicates of other articles
    topic.setArticleHasDuplicateFilter("skipHasDuplicates")
    # return only articles that are about some event that we have detected
    topic.setArticleHasEventFilter("skipArticlesWithoutEvent")
    topic.setLanguages("eng")

    articles = topic.getArticles(page=1, count = 20, sortBy="rel")
    return articles

recommendations = recommend_news(USER_PREFERENCE)

# Prepare data for JSON
news_data = [{
    "title": article.get("title", "No title available"),
    "content": article.get("body", "No content available"), # or "content" based on the API response
    "link": article.get("url", "No URL available")
} for article in recommendations.get("articles", {}).get("results", [])]

# Define file path
file_path = 'news-digest/news-recommendation/recommended_news.json'

with open(file_path, 'w') as file:
    json.dump(news_data, file, indent=4)

print(f"News data saved to {file_path}")