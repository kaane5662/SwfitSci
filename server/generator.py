from db import vstore, OPENAI_API_KEY
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_community.callbacks import get_openai_callback
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
import requests

llm = ChatOpenAI(api_key=OPENAI_API_KEY)
embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY)

class Generator():
    def generate_intro(data, task):
        with get_openai_callback() as cb:
            retriever = vstore.as_retriever(search_type="mmr", search_kwargs={"k":5}, embedding_function=embeddings.embed_query)    
            # print(data)
            
            similar = retriever.invoke(data)
            samples = ""
            for idx, paragraph in enumerate(similar):
                samples += f"\nExample {idx + 1}:\n{paragraph.page_content}\n"
            # print(samples)
            generator_template = """
                You are a ressearch professor and a scientist who assists in crafting the perfect scientific research paper. Your goal is to write your own take of the introduction of this paper. This is where you describe briefly and clearly why you are writing the paper. The introduction supplies sufficient background information for the reader to understand and evaluate the experiment you did. It also supplies a rationale for the study.

                Goals:

                Present the problem and the proposed solution
                Presents nature and scope of the problem investigated
                Reviews the pertinent literature to orient the reader
                States the method of the experiment
                State the principle results of the experiment



                SAMPLES:
                {samples}

                INPUT:
                {input}
            
                YOUR TASK:
                {task}


                INTRODUCTION:"""
            summary_prompt = ChatPromptTemplate.from_template(generator_template)
            chain = (
                # {"samples": retriever}
                summary_prompt
                | llm
                | StrOutputParser()
            )
            answer = chain.invoke({"input":data,"samples":samples, "task": task})
            return answer, cb.total_tokens
    
    def generate_methodology(data, task):
        with get_openai_callback() as cb:
            retriever = vstore.as_retriever(search_type="mmr", search_kwargs={"k":5}, embedding_function=embeddings.embed_query)    
            print(data)
            
            similar = retriever.invoke(data)
            samples = ""
            for idx, paragraph in enumerate(similar):
                samples += f"\nExample {idx + 1}:\n{paragraph.page_content}\n"
            generator_template = """
                You are a ressearch professor and a scientist who assists in crafting the perfect scientific research paper. Your goal is to only write the Materials and Methods of this paper. The purpose is to provide enough detail that a competent worker could repeat the experiment. Many of your readers will skip this section because they already know from the Introduction the general methods you used. However careful writing of this section is important because for your results to be of scientific merit they must be reproducible. Otherwise your paper does not represent good science.


                Goals:

                Exact technical specifications and quantities and source or method of preparation
                Describe equipment used and provide illustrations where relevant.
                Chronological presentation (but related methods described together)
                Questions about "how" and "how much" are answered for the reader and not left for them to puzzle over
                Discuss statistical methods only if unusual or advanced
                When a large number of components are used prepare tables for the benefit of the reader
                Do not state the action without stating the agent of the actiom

                SAMPLES:
                {samples}

                INPUT:
                {input}
                
                YOUR TASK:
                {task}

                METHODOLOGY:"""
            summary_prompt = ChatPromptTemplate.from_template(generator_template)
            chain = (
                # {"samples": retriever}
                summary_prompt
                | llm
                | StrOutputParser()
            )
            answer = chain.invoke({"input":data,"samples":samples, "task": task})
            return answer, cb.total_tokens
    
    def generate_results(data, task):
        with get_openai_callback() as cb:
            retriever = vstore.as_retriever(search_type="mmr", search_kwargs={"k":5}, embedding_function=embeddings.embed_query)    
            print(data)
            
            similar = retriever.invoke(data)
            samples = ""
            for idx, paragraph in enumerate(similar):
                samples += f"\nExample {idx + 1}:\n{paragraph.page_content}\n"
            generator_template = """
                You are a ressearch professor and a scientist who assists in crafting the perfect scientific research paper. Your goal is to only write the Results of this paper. This is the core of the paper. Don't start the results sections with methods you left out of the Materials and Methods section. You need to give an overall description of the experiments and present the data you found.

                Goals:

                Factual statements supported by evidence. Short and sweet without excess words
                Present representative data rather than endlessly repetitive data
                Discuss variables only if they had an effect (positive or negative)
                Use meaningful statistics
                Avoid redundancy. If it is in the tables or captions you may not need to repeat it
                Always use simple and clear language. Avoid the use of uncertain or out-of-focus expressions.
                The findings of the study must be expressed in an objective and unbiased manner. While it is acceptable to correlate certain findings in the discussion section, it is best to avoid overinterpreting the results.
                If the research addresses more than one hypothesis, use sub-sections to describe the results. This prevents confusion and promotes understanding.
                Ensure that negative results are included in this section, even if they do not support the research hypothesis.
                Wherever possible, use illustrations like tables, figures, charts, or other visual representations to showcase the results of your research paper. Mention these illustrations in the text, but do not repeat the information that they convey.
                For statistical data, it is adequate to highlight the tests and explain their results. The initial or raw data should not be mentioned in the results section of a research paper.


                SAMPLES:
                {samples}

                INPUT:
                {input}
                
                YOUR TASK: 
                {task}

                RESULTS:"""
            summary_prompt = ChatPromptTemplate.from_template(generator_template)
            chain = (
                # {"samples": retriever}
                summary_prompt
                | llm
                | StrOutputParser()
            )
            answer = chain.invoke({"input":data,"samples":samples, "task":task})
            return answer, cb.total_tokens
    

    def generate_discussion(data, task):
        with get_openai_callback() as cb:
            retriever = vstore.as_retriever(search_type="mmr", search_kwargs={"k":5}, embedding_function=embeddings.embed_query)    
            print(data)
            
            similar = retriever.invoke(data)
            samples = ""
            for idx, paragraph in enumerate(similar):
                samples += f"\nExample {idx + 1}:\n{paragraph.page_content}\n"
            generator_template = """
                You are a ressearch professor and a scientist who assists in crafting the perfect scientific research paper. Your goal is to only write the Discussion of this paper. This is is usually the hardest section to write. You are trying to bring out the true meaning of your data without being too long. Do not use words to conceal your facts or reasoning. Also do not repeat your results, this is a discussion.

                Goals:

                Present principles, relationships and generalizations shown by the results
                Point out exceptions or lack of correlations. Define why you think this is so.
                Show how your results agree or disagree with previously published works
                Discuss the theoretical implications of your work as well as practical applications
                State your conclusions clearly. Summarize your evidence for each conclusion.
                Discuss the significance of the results



                SAMPLES:
                {samples}

                INPUT:
                {input}
                
                YOUR TASK:
                {task}


                DISCUSSION:"""
            summary_prompt = ChatPromptTemplate.from_template(generator_template)
            chain = (
                # {"samples": retriever}
                summary_prompt
                | llm
                | StrOutputParser()
            )
            answer = chain.invoke({"input":data,"samples":samples, "task": task})
            return answer, cb.total_tokens
    def generate_conclusion(data, task):
        with get_openai_callback() as cb:
            retriever = vstore.as_retriever(search_type="mmr", search_kwargs={"k":5}, embedding_function=embeddings.embed_query)    
            print(data)
            
            similar = retriever.invoke(data)
            samples = ""
            for idx, paragraph in enumerate(similar):
                samples += f"\nExample {idx + 1}:\n{paragraph.page_content}\n"
            generator_template = """
                You are a ressearch professor and a scientist who assists in crafting the perfect scientific research paper. Your goal is to only write the Conclusion of this paper. A well-written conclusion provides you with several important opportunities to demonstrate your overall understanding of the research problem to the reader. 
                
                These include:

                Presenting the last word on the issues you raised in your paper. Just as the introduction gives a first impression to your reader, the conclusion offers a chance to leave a lasting impression. Do this, for example, by highlighting key points in your analysis or findings.
                Summarizing your thoughts and conveying the larger implications of your study. The conclusion is an opportunity to succinctly answer the "so what?" question by placing the study within the context of past research about the topic you've investigated.
                Demonstrating the importance of your ideas. Don't be shy. The conclusion offers you a chance to elaborate on the significance of your findings.
                Introducing possible new or expanded ways of thinking about the research problem. This does not refer to introducing new information [which should be avoided], but to offer new insight and creative approaches for framing/contextualizing the research problem based on the results of your study.

                SAMPLES:
                {samples}

                INPUT:
                {input}
                
                YOUR TASK:
                {task}

                CONCLUSION:"""
            summary_prompt = ChatPromptTemplate.from_template(generator_template)
            chain = (
                # {"samples": retriever}
                summary_prompt
                | llm
                | StrOutputParser()
            )
            answer = chain.invoke({"input":data,"samples":samples, "task": task})
            return answer, cb.total_tokens
        
    def generate_header(data, header:str):
        header = header.upper()
        with get_openai_callback() as cb:
            retriever = vstore.as_retriever()
            generator_template = """
                You are a ressearch professor and a scientist who assists in crafting the perfect scientific research paper. A well written research paper follows the following structure:
                
                INTRODUCTION:
                This is where you describe briefly and clearly why you are writing the paper. The introduction supplies sufficient background information for the reader to understand and evaluate the experiment you did. It also supplies a rationale for the study.
                
                Goals:

                Present the problem and the proposed solution
                Presents nature and scope of the problem investigated
                Reviews the pertinent literature to orient the reader
                States the method of the experiment
                State the principle results of the experiment
                
                MATERIALS AND METHODS:
                The purpose is to provide enough detail that a competent worker could repeat the experiment. Many of your readers will skip this section because they already know from the Introduction the general methods you used. However careful writing of this section is important because for your results to be of scientific merit they must be reproducible. Otherwise your paper does not represent good science.


                Goals:

                Exact technical specifications and quantities and source or method of preparation
                Describe equipment used and provide illustrations where relevant.
                Chronological presentation (but related methods described together)
                Questions about "how" and "how much" are answered for the reader and not left for them to puzzle over
                Discuss statistical methods only if unusual or advanced
                When a large number of components are used prepare tables for the benefit of the reader
                Do not state the action without stating the agent of the action

                RESULTS:
                This is the core of the paper. Don't start the results sections with methods you left out of the Materials and Methods section. You need to give an overall description of the experiments and present the data you found.

                Goals:

                Factual statements supported by evidence. Short and sweet without excess words
                Present representative data rather than endlessly repetitive data
                Discuss variables only if they had an effect (positive or negative)
                Use meaningful statistics
                Avoid redundancy. If it is in the tables or captions you may not need to repeat it
                Always use simple and clear language. Avoid the use of uncertain or out-of-focus expressions.
                The findings of the study must be expressed in an objective and unbiased manner. While it is acceptable to correlate certain findings in the discussion section, it is best to avoid overinterpreting the results.
                If the research addresses more than one hypothesis, use sub-sections to describe the results. This prevents confusion and promotes understanding.
                Ensure that negative results are included in this section, even if they do not support the research hypothesis.
                Wherever possible, use illustrations like tables, figures, charts, or other visual representations to showcase the results of your research paper. Mention these illustrations in the text, but do not repeat the information that they convey.
                For statistical data, it is adequate to highlight the tests and explain their results. The initial or raw data should not be mentioned in the results section of a research paper.

                DISCUSSION:
                This is is usually the hardest section to write. You are trying to bring out the true meaning of your data without being too long. Do not use words to conceal your facts or reasoning. Also do not repeat your results, this is a discussion.

                Goals:

                Present principles, relationships and generalizations shown by the results
                Point out exceptions or lack of correlations. Define why you think this is so.
                Show how your results agree or disagree with previously published works
                Discuss the theoretical implications of your work as well as practical applications
                State your conclusions clearly. Summarize your evidence for each conclusion.
                Discuss the significance of the results

                CONCLUSION:
                A well-written conclusion provides you with several important opportunities to demonstrate your overall understanding of the research problem to the reader. 
                
                Goals:

                Presenting the last word on the issues you raised in your paper. Just as the introduction gives a first impression to your reader, the conclusion offers a chance to leave a lasting impression. Do this, for example, by highlighting key points in your analysis or findings.
                Summarizing your thoughts and conveying the larger implications of your study. The conclusion is an opportunity to succinctly answer the "so what?" question by placing the study within the context of past research about the topic you've investigated.
                Demonstrating the importance of your ideas. Don't be shy. The conclusion offers you a chance to elaborate on the significance of your findings.
                Introducing possible new or expanded ways of thinking about the research problem. This does not refer to introducing new information [which should be avoided], but to offer new insight and creative approaches for framing/contextualizing the research problem based on the results of your study.



                You are going to write the {header} of this paper ONLY. Target the structure of the {header} to be based on the SAMPLES of {header}s, but tailored to the following user INPUT. When it comes to writing this paper, two factors are crucial, "perplexity" and "burstiness." Perplexity measures the complexity of text. Separately, burstiness compares the variations of sentences. Humans tend to write with greater burstiness, for example, with some longer or complex sentences alongside shorter ones. AI sentences tend to be more uniform. Therefore, when writing the following content I am going to ask you to create, I need it to have a good amount of perplexity and burstiness in YOUR ANSWER. Also keep the wording simple and friendly, lexile 300.

                SAMPLES:
                {samples}

                INPUT:
                {input}
    


                YOUR ANSWER:"""
            summary_prompt = ChatPromptTemplate.from_template(generator_template)
            chain = (
                # {"samples": retriever}
                summary_prompt
                | llm
                | StrOutputParser()
            )
            answer = chain.invoke({"input":data,"samples":retriever, "header": header})
            return answer, cb.total_tokens

        
    




