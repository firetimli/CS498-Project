import nltk, string
from sklearn.feature_extraction.text import TfidfVectorizer
from flask import Flask, abort, request, jsonify, render_template, redirect, url_for, session
import json, re
import datetime
from datetime import date

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

nltk.download('punkt') # if necessary...

from nltk import word_tokenize,sent_tokenize

stemmer = nltk.stem.porter.PorterStemmer()
remove_punctuation_map = dict((ord(char), None) for char in string.punctuation)


@app.route('/search', methods=["GET", "POST"])
def search():
    req = request.get_json()
    print('print request')
    print(req)
    jobDescription = req['jobDescription']
    resumes = req['resumes']

    # req.jobDescription, req.resumes
    results = compareJDWithResumes(jobDescription, resumes)
    indices = [r[2] for r in results]
    indices = indices[:5]
    #results = compareJDWithResumes(req.jobDescription, req.resumes)
    print(results)
    print(indices)

    return jsonify(status='OK', data = indices)

def stem_tokens(tokens):
    return [stemmer.stem(item) for item in tokens]

'''remove punctuation, lowercase, stem'''
def normalize(text):
    return stem_tokens(nltk.word_tokenize(text.lower().translate(remove_punctuation_map)))

vectorizer = TfidfVectorizer(tokenizer=normalize, stop_words='english')

def cosine_sim(text1, text2):
    tfidf = vectorizer.fit_transform([text1, text2])
    return ((tfidf * tfidf.T).A)[0,1]

def compareJDWithResumes(jobDescription, resumes):
    index = 0
    resumeList = []
    for resume in resumes:
        score = cosine_sim(jobDescription, resume)
        resumeList.append((resume, score, index))
        index += 1
    resumeList.sort(key=lambda x: x[1], reverse=True)
    return resumeList[0:10]

if __name__ == '__main__':
	app.run(debug = True, port=8000)
