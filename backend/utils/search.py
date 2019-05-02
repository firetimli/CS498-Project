import nltk, string
from sklearn.feature_extraction.text import TfidfVectorizer

nltk.download('punkt') # if necessary...
from nltk import word_tokenize,sent_tokenize

stemmer = nltk.stem.porter.PorterStemmer()
remove_punctuation_map = dict((ord(char), None) for char in string.punctuation)

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
	resumeList = []
	for resume in resumes:
		score = cosine_sim(jobDescription, resume)
		resumeList.append((resume, score))
	resumeList.sort(key=lambda x: x[1], reverse=True)
	return resumeList[0:10]
