import re
from eventregistry import *
from flask import Flask, app, request
from monsterapi import client
from openai import OpenAI
app = Flask(__name__)

er = EventRegistry(apiKey = '81b0c82b-624f-4eea-8ccd-43c53036beff')

@app.route('/txt2speech', methods=['POST'])
def handle_json():
    data = request.json
    '''ex json body request
    {
        "user_pref": "Technology"
    }
    '''
    message = data['message'] # this gets the user pref key from react's fetch request
    familiarity_score = data['fscore']
    audio = txt2speech(familiarity_score, message)
    return audio

def txt2speech(familiarity_score, article):

    if familiarity_score == "1": # Least familiar
        initial_request = "Summarize the following text and explain it simply to a child: " + article
    elif familiarity_score == "2":
        initial_request = "Summarize the following text and explain it simply: " + article
    else: # Most familiar
        initial_request = "Summarize the following text: " + article


    openAIclient = OpenAI(api_key='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')
    completion = openAIclient.chat.completions.create(
    model="gpt-3.5-turbo", # gpt-4-turbo-preview
    messages=[
        {"role": "system", "content": "You are a helpful assistant, skilled in explaining complex news topics in a simple and clear manner. Keep it less than 100 words."},
        {"role": "user", "content": initial_request}
    ]
    )


    intermediate_response_text = completion.choices[0].message.content
    final_content = intermediate_response_text.replace("ChatCompletionMessage(content=\"", "")
    final_content = intermediate_response_text.replace("\", role=\'assistant\', function_call=None, tool_calls=None)", "")
    final_content = final_content.replace("\\n", "\n")
    final_content = final_content.replace("**", "")

    
    monster_client = client('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjJmNjUyZTFjYTNiOTVkNWJjNWY4ZGVhNjE0Y2Y0Yzc3IiwiY3JlYXRlZF9hdCI6IjIwMjQtMDItMThUMDg6MDA6MTYuMzc3MDMxIn0.TuFCl4uib0elL7l-oUzG0mqdAOSRHoN3Z8xgBQjLQPg')
    response = monster_client.get_response(model='sunoai-bark', data={"prompt": final_content, 'speaker':'de_speaker_4', 'text_temp':0.3, 'wave_temp':0.3, "sample_rate": 27000})
    audio = monster_client.wait_and_get_result(response['process_id'],timeout=200)

    return audio
