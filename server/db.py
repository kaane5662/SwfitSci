from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.llms import OpenAI
from langchain_astradb import AstraDBVectorStore
from astrapy.db import AstraDB, AstraDBCollection
from dotenv import load_dotenv
import os

# hello form db
load_dotenv()
ASTRA_DB_APPLICATION_TOKEN = os.environ.get("ASTRA_DB_APPLICATION_TOKEN")
ASTRA_DB_API_ENDPOINT = os.environ.get("ASTRA_DB_API_ENDPOINT")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
try:

    vstore = AstraDBVectorStore(
        embedding=OpenAIEmbeddings(api_key=OPENAI_API_KEY),
        collection_name="articlestore2",
        token=ASTRA_DB_APPLICATION_TOKEN,
        api_endpoint=ASTRA_DB_API_ENDPOINT,
        namespace="research_papers"
    )

except Exception as e:
    print(f"Failed to connect to ASTRA DB Vector store: {e}")


