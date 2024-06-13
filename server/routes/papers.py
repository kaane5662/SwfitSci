from flask import Blueprint, jsonify, request, make_response,g, session
from helpers.session import valid_session
from generator import Generator
import json
from connections.mongoconnect import connect_mongo
from models.papers import Paper
from models.profile import Profile
from helpers import tasks


connect_mongo()

def process_documents(document):
    document = document.to_mongo().to_dict()
    document["_id"] = str(document["_id"])
    document["id"] = document["_id"]
    return document

papers_bp = Blueprint('papers', __name__, url_prefix='/papers')

@papers_bp.route('/', methods=['POST'])
@valid_session
def papers():
    print("Valid session")
    data = request.form
    # data = json.dump(data)
    try:
        user = Profile.objects(id=session["user"]["id"]).first()
        if user.tokens > user.limit_tokens:  return jsonify({"message": f"Token limit exceeded"}), 401
        # data = str(data)
        new_data = data.to_dict(flat=True)
        new_data = json.dumps(data)
        
        
        title = data.get("title")
        intro,tokenI = Generator.generate_intro(new_data, tasks.generate)
        methods, tokenM = Generator.generate_methodology(new_data, tasks.generate)
        results, tokenR = Generator.generate_results(new_data, tasks.generate)
        discussion, tokenD, = Generator.generate_discussion(new_data, tasks.generate)
        conclusion, tokenC = Generator.generate_conclusion(new_data, tasks.generate)
        user.tokens += tokenI+tokenM+tokenR+tokenD+tokenC
        user.save()
    
        # analysis = Generator.gen(new_data)
        print(session["user"]["id"])
        new_paper = Paper(
            owner_id=session["user"]["id"],
            title=title,
            introduction=intro,
            methodology=methods,
            results=results,
            discussion=discussion,
            conclusion=conclusion,
            background = data.get("background"),
            research_question = data.get("research_question"),
            data_collection = data.get("data_collection"),
            findings = data.get("findings"),
            variables = data.get("variables"),
            type = data.get("type"),
            # experimental stuff
            blindness = data.get("blindness"),
            control_groups = data.get("control_groups"),
            participants = data.get("participants"),
            sampling_method = data.get("sampling_method")
        )
        saved_paper = new_paper.save()
        
        return jsonify(),201
    except Exception as e:
        print(e)
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500

@papers_bp.route('/', methods=['GET'])
@valid_session
def get_papers():
    try:
        Papers = Paper.objects(owner_id=session["user"]["id"])
        papers_list = list(map(process_documents, Papers))
        return jsonify(papers_list),200
    except Exception as e:
        print(e)
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500
    
@papers_bp.route('/<string:id>', methods=['GET'])
@valid_session
def get_paper(id):
    try:
        # print("hello")
        paper = Paper.objects(owner_id=session["user"]["id"], id = id).first()
        
        paper = paper.to_mongo().to_dict()
        paper["_id"] = str(paper["_id"])
        # print(paper)
        return jsonify(paper),200
    except Exception as e:
        print(e)
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500

@papers_bp.route('/<string:id>', methods=['PUT'])
@valid_session
def edit_paper(id):
    data = request.json
    # print(data)
    try:
        # print("hello")
        print(data.get("changes"))
        paper = Paper.objects(owner_id=session["user"]["id"], id = id).first()
        if(data.get("header") == "introduction"): paper.introduction = data.get("changes")
        if(data.get("header") == "methodology"): paper.methodology = data.get("changes")
        if(data.get("header") == "results"): paper.results = data.get("changes")
        if(data.get("header") == "discussion"): paper.discussion = data.get("changes")
        if(data.get("header") == "conclusion"): paper.conclusion = data.get("changes")
        paper.save()
        # print(paper)
        return jsonify({"message": "Paper saved successfully"}),200
    except Exception as e:
        print(e)
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500
    
@papers_bp.route('/details/<string:id>', methods=['PUT'])
@valid_session
def edit_form_details(id):
    data = request.form
    # print(data)
    try:
        # print("hello")
        
        paper = Paper.objects(owner_id=session["user"]["id"], id = id).first()
        if data.get("type"): paper.type = data.get("type")
        if data.get("title"): paper.title = data.get("title")
        if data.get("background"): paper.background = data.get("background")
        if data.get("research_question"): paper.research_question = data.get("research_question") 
        if data.get("data_collection"): paper.data_collection = data.get("data_collection")
        if data.get("variables"): paper.variables = data.get("variables")
        if data.get("findings"): paper.findings = data.get("findings")
        # experiment
        if data.get("participants"): paper.participants = data.get("participants")
        if data.get("control_groups"): paper.control_groups = data.get("control_groups")
        if data.get("blindness"): paper.blindness = data.get("blindness")
        if data.get("sampling_method"): paper.sampling_method = data.get("sampling_method")
        paper.save()
        # print(paper)
        return jsonify({"message": "Paper saved successfully"}),200
    except Exception as e:
        print(e)
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500
    
@papers_bp.route('/<string:id>', methods=['DELETE'])
@valid_session
def delete_paper(id):
    # print(data)
    try:
        # print("hello")
        Paper.objects(id=id).delete()
        # print(paper)
        return jsonify({"message": "Paper deleted successfully"}),200
    except Exception as e:
        print(e)
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500

@papers_bp.route('regenerate/<string:header>', methods=['GET'])
@valid_session   
def regenerate(header):
    
    try:
        # print("hello")

        paper = Paper.objects(owner_id=session["user"]["id"], id = id).first()
        # result, tokens = "", 0
        if header == "introduction": result, tokens = Generator.generate_intro()
        if header == "methodology": result, tokens = Generator.generate_methodology()
        if header == "results": result, tokens = Generator.generate_results()
        if header == "discussion": result, tokens = Generator.generate_discussion()
        if header == "conclusion": result, tokens = Generator.generate_conclusion()

        paper[header] = result
        
        paper.save()
        #       print(paper)
        return jsonify({"message": "Paper saved successfully"}),200
    except Exception as e:
        print(e)
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500


print("Hello world")

@papers_bp.route('/feedback/<string:id>', methods=['GET'])
@valid_session   
def feedback(id):
    try:
        # print("hello")
        
        paper = Paper.objects(owner_id=session["user"]["id"], id = id).first()
        paper.id = str(paper.id)
        # result, tokens = "", 0
        intro_feedback, tokens = Generator.generate_intro(paper, tasks.feedback)
        methods_feedback , tokens = Generator.generate_methodology(paper, tasks.feedback)
        results_feedback, tokens = Generator.generate_results(paper, tasks.feedback)
        discussion_feedback, tokens = Generator.generate_discussion(paper, tasks.feedback)
        conclusion_feedback, tokens = Generator.generate_conclusion(paper, tasks.feedback)
        feedback = [intro_feedback,methods_feedback,results_feedback,discussion_feedback,conclusion_feedback]
        print(feedback)
        # print(paper)
        return jsonify(feedback),201
    except Exception as e:
        print(e)
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500
@papers_bp.route('feedback/<string:header>', methods=['POST'])
@valid_session   

def feedback_header(header):
    data = request.data
    try:
        sentence = data.get("sentence")
        feedback_type = data.get("feedback_type")
        # print("hello")
        
        paper = Paper.objects(owner_id=session["user"]["id"], id = id).first()
        # result, tokens = "", 0
        if header == "introduction": result, tokens = Generator.generate_intro()
        if header == "methodology": result, tokens = Generator.generate_methodology()
        if header == "results": result, tokens = Generator.generate_results()
        if header == "discussion": result, tokens = Generator.generate_discussion()
        if header == "conclusion": result, tokens = Generator.generate_conclusion()

        paper[header] = result
        
        paper.save()
        # print(paper)
        return jsonify({"message": "Paper saved successfully"}),200
    except Exception as e:
        print(e)
        return jsonify({"message": f"Unexpected error has occured {e}"}), 500