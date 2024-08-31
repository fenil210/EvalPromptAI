import os, random 
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
from list import prompt_templates
# Load environment variables
load_dotenv()

# Configure the Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app)


def generate_evaluation_prompt(topic, template_key):
    try:
        model = genai.GenerativeModel('gemini-1.5-pro')
        
        system_prompt = """You are an Evaluation Prompt generator named Felvin. Start your response with "place your input text here: \n". Always use the word "You" to address the LLM directly. Focus solely on the task without adding any tables, lists, or other output formats. Avoid introductory or concluding sentences; be concise and direct."""
        print("template_key",template_key)
        selected_prompt = prompt_templates.get(template_key, prompt_templates["Domain Expert Simulation"])
        gemini_prompt = selected_prompt.format(topic=topic)
        final_prompt = f"{system_prompt}\n\n{gemini_prompt}"
        
        response = model.generate_content(final_prompt)
        return response.text

    except Exception as e:
        return f"An error occurred while generating the prompt: {str(e)}"

@app.route('/generate-prompt', methods=['POST'])
def generate_prompt():
    data = request.json
    
    topic = data.get('topic')
    template_key = data.get('template', 'Domain Expert Simulation')
    
    if not topic:
        return jsonify({"error": "No topic provided"}), 400
    
    prompt = generate_evaluation_prompt(topic, template_key)
    return jsonify({"prompt": prompt})

@app.route('/prompt-templates', methods=['GET'])
def get_prompt_templates():
    return jsonify(list(prompt_templates.keys()))

if __name__ == '__main__':
    app.run(debug=True)