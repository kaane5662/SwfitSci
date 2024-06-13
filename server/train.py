from db import vstore
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI
import requests
import json


with open("articles.json", "r") as file:
    # Load the data from the file
    articles_data = json.load(file)

documents = []

print("Setting up documents")
for article in articles_data:
    for header, content in article.items():
        if content == "": continue
        document = Document(page_content=content, metadata = {"header":header})
        documents.append(document)

print("Inserting Articles")
vstore.add_documents(documents)
print("Articles inserted successfuly")