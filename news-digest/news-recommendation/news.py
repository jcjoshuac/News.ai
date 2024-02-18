# NewsAPI: 81b0c82b-624f-4eea-8ccd-43c53036beff

from eventregistry import *
from flask import Flask, app, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

er = EventRegistry(apiKey = '81b0c82b-624f-4eea-8ccd-43c53036beff')

@app.route('/json_example', methods=['POST'])
def handle_json():
    data = request.json
    '''ex json body request
    {
        "user_pref": "Technology"
    }
    '''
    user_pref = data.get('user_pref') # this gets the user pref key from react's fetch request
    recommendations = recommend_news(user_pref)
    return to_json(recommendations)

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

    articles = topic.getArticles(page=1, count = 20, sortBy="date")
    return articles


def to_json(recommendations):
    news_data = [{
        "title": article.get("title", "No title available"),
        "content": article.get("body", "No content available"), # or "content" based on the API response
        "link": article.get("url", "No URL available")
    } for article in recommendations.get("articles", {}).get("results", [])]

    json_string = json.dumps(news_data, indent=4)  # 'indent' for pretty-printing
    return json_string
