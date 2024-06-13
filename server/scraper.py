from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import random
import time

driver = webdriver.Chrome()
wait = WebDriverWait(driver,10)
driver.get("https://go.gale.com/ps/browseCategory?userGroupName=nysl_oweb&inPS=true&prodId=AONE&category=Psychology")

articles_content = []
max_articles:int = 3
max_disciplines:int = 3
max_topics:int =20
relevant_disciplines= [8]


def scrape_article():
    try:
        article_content = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "article-content")))  

        paras = article_content.find_elements(By.TAG_NAME, "p")

        article_content = {
            "abstract": "",
            "introduction": "",
            "methodology": "",
            "results": "",
            "discussion": "",
            "conclusion": "",
            "references": ""
        }
        current_header = "abstract"
        for para in paras:
            # print(para.text)

            if ("abstr" in para.text.lower() or "abstr" in para.text.lower()) and len(para.text) < 45:
                current_header = "abstract"
            if ("intro" in para.text.lower() or "backgr" in para.text.lower()) and len(para.text) < 45:
                current_header = "introduction"
            elif "method" in para.text.lower() or "materi" in para.text.lower() and len(para.text) < 45:
                current_header = "methodology"
            # elif "analy" in para.text.lower() and len(para.text) < 45:
            #     current_header = "analysis"
            elif "results" in para.text.lower() and len(para.text) < 45:
                current_header = "results"
            elif "discussion" in para.text.lower() and len(para.text) < 45:
                current_header = "discussion"
            elif "conclu" in para.text.lower() and len(para.text) < 45:
                current_header = "conclusion"
            elif "references" in para.text.lower() and len(para.text) < 45:
                current_header = "references"

            if article_content[current_header] == "":
                article_content[current_header] = para.text
            else:
                article_content[current_header] += f"\n{para.text}"
    except Exception as e:
        print(f"Error getting article index: {e}") 

    counter = 0;
    for value in article_content.values():
        if len(value) > 4:
            counter +=1  

    if counter < 4:
        return
    else:
        articles_content.append(article_content)   

def scrape_topic_articles():
    for i in range(max_articles):
        try:
            parent_element = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "search-results-list")))
            article_links = parent_element.find_elements(By.CLASS_NAME, "documentLink")  
            article_links[i].click()
            scrape_article()
            driver.back()
        except Exception as e:
            print(f"Error scraping topic {i}: {e}") 

def select_topics(button_text:str):
    for i in range(max_topics):
        try:
            print("Iteration")
            topics = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "categories")))
            topic_links = topics.find_elements(By.CLASS_NAME, f"{button_text}")
            print("Hello")
            # print(topic_links)
            topic_link = topic_links[i]
            print(topic_link.text)

            topic_link.find_element(By.TAG_NAME, "a").click()
            scrape_topic_articles()
            driver.back()
        except Exception as e:
            print(f"Error getting article index {i}: {e}") 


def select_diciplines():
    for relevant_index in relevant_disciplines:
        try:
            disciplines = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "topic-list")))
            discipline_buttons = disciplines.find_elements(By.TAG_NAME, "li")
            discipline_button = discipline_buttons[relevant_index]
            print(discipline_button.text)
            text = discipline_button.text
            driver.get(f"https://go.gale.com/ps/browseCategory?userGroupName=nysl_oweb&inPS=true&prodId=AONE&category={text}")
            time.sleep(3)
            select_topics(text)
        except Exception as e:
            print(f"Error getting article dsicipline {relevant_index}: {e}") 
        # driver.back()

# get to articles lust
anchor_element = driver.find_element(By.CLASS_NAME,"galeContact")  # Replace 'your_anchor_id' with the actual ID of the anchor element
anchor_element.click()
select_diciplines()
# wait = WebDriverWait(driver,10)

# parent_element = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "search-results-list")))  

# print(parent_element)

# article_links = parent_element.find_elements(By.CLASS_NAME, "documentLink")


# click page links
# for i in range(max_articles):
#     parent_element = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "search-results-list")))
#     article_links = parent_element.find_elements(By.CLASS_NAME, "documentLink")  
#     article_links[i].click()
#     # extract text from each article
#     try:


#         article_content = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "article-content")))  

#         paras = article_content.find_elements(By.TAG_NAME, "p")

#         article_content = {
#             "abstract": "",
#             "introduction": "",
#             "methodology": "",
#             "results": "",
#             "discussion": "",
#             "conclusion": "",
#             "references": ""
#         }
#         current_header = "abstract"
#         for para in paras:
#             # print(para.text)
#             if "abstract" in para.text.lower() and len(para.text) < 45:
#                 current_header = "abstract"
#             elif "introduction" in para.text.lower() and len(para.text) < 45:
#                 current_header = "introduction"
#             elif "method" in para.text.lower() and len(para.text) < 45:
#                 current_header = "methodology"
#             elif "results" in para.text.lower() and len(para.text) < 45:
#                 current_header = "results"
#             elif "discussion" in para.text.lower() and len(para.text) < 45:
#                 current_header = "discussion"
#             elif "conclusion" in para.text.lower() and len(para.text) < 45:
#                 current_header = "discussion"
#             elif "references" in para.text.lower() and len(para.text) < 45:
#                 current_header = "references"

#             if article_content[current_header] == "":
#                article_content[current_header] = para.text
#             else:
#                 article_content[current_header] += f"\n{para.text}"
                
        
#         # print(article_content)
#         articles_content.append(article_content)

#     except Exception as e:
#         print(f"Error getting article index {i}: {e}")

#     driver.back()

# print(articles_content)
with open("articles.json", "w") as json_file:
    json_file.write(json.dumps(articles_content, indent=4))
    

    


driver.quit()