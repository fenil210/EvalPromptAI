prompt_templates = {
    "Domain Expert Simulation":"""Assume the role of a leading expert in {topic}. Create a comprehensive evaluation framework for assessing LLM-generated content in this field. Your framework should:
1. Include 7-10 domain-specific evaluation criteria, each with a 0-10 score range.
2. For each criterion, provide 2-3 probing questions an expert would ask.
3. Suggest 3-5 key metrics or data points to quantify the quality of content in this domain.
4. Outline potential pitfalls or common misconceptions in {topic} that the LLM should avoid.
5. Propose a method to weigh these criteria for an overall score (0-100).
6. Include instructions for providing qualitative feedback, including strengths and areas for improvement.
Format your response as a clear, structured guide for a fellow expert to evaluate LLM content in {topic}.""",

"Comparative Analysis": """Design an evaluation system for LLM-generated content about {topic} that compares it to human expert-created content in the field. Your system should:
1. Identify 5-7 key areas where LLM content might differ from expert content in {topic}.
2. Create a scoring rubric (0-10) for each area, with clear distinctions between scores.
3. Suggest methods to quantify the 'human-likeness' or 'expert-likeness' of the content.
4. Include criteria for evaluating the innovative aspects of the LLM content vs. typical human approaches in {topic}.
5. Propose a way to assess the practical applicability or real-world relevance of the LLM content in this domain.
6. Outline a process for holistic comparison, resulting in an overall similarity score (0-100%).
Provide this as a structured guide, including examples specific to {topic} for each point.""",

"Multi-Stakeholder Perspective ":"""Create an evaluation framework for LLM-generated content about {topic} from the perspective of multiple stakeholders. Your framework should:
1. Identify 4-5 key stakeholder groups relevant to {topic} (e.g., practitioners, researchers, end-users, regulators).
2. For each stakeholder group, develop 3-4 evaluation criteria they would prioritize, each scored 0-10.
3. Suggest ways to quantify the content's value or impact for each stakeholder group.
4. Include a method to assess how well the content balances the needs and interests of all stakeholders.
5. Propose a system to weigh stakeholder perspectives for an overall score (0-100).
6. Outline how to provide constructive feedback from each stakeholder's viewpoint.
Present this as a comprehensive guide, with {topic}-specific examples and considerations throughout.""",

"Ethical and Societal Impact Evaluation": """Develop a framework to evaluate the ethical implications and societal impact of LLM-generated content about {topic}. Your framework should:
1. Identify 5-7 ethical considerations or potential societal impacts specific to {topic}.
2. Create a scoring system (0-10) for each consideration, defining what each score represents.
3. Suggest methods to quantify the potential positive and negative impacts of the content.
4. Include criteria for evaluating the content's awareness and handling of diverse perspectives or potential biases in {topic}.
5. Propose a way to assess the long-term implications of the content if it were widely adopted or believed.
6. Outline a process for providing an overall ethical impact score (0-100) and qualitative summary.
Structure this as a detailed guide, incorporating {topic}-specific scenarios and ethical dilemmas.""",

"Future-Oriented Evaluation":"""Design an evaluation system for LLM-generated content about {topic} that assesses its forward-thinking nature and potential future impact. Your system should:
1. Identify 6-8 aspects of future-readiness or innovation relevant to {topic}.
2. Create a scoring rubric (0-10) for each aspect, clearly defining what constitutes a high or low score.
3. Suggest methods to quantify the content's predictive power or alignment with emerging trends in {topic}.
4. Include criteria for evaluating the content's adaptability to potential future scenarios in this domain.
5. Propose a way to assess the content's potential to drive progress or paradigm shifts in {topic}.
6. Outline a process for synthesizing these elements into an overall future impact score (0-100).
Present this as a structured guide, including speculative yet grounded examples specific to the future of {topic}."""
}