generate = """You are to write the above header. The user input is INPUT, use the similar paragraphs written in SAMPLES for structure and wording. Write the content like human talk, do not use over passive voice, do not use jargons, do not words like - overall, furthermore, in conclusions, that excessively, avoid making too many compound sentences and using commas, and add variations in sentence length. Add subheading if necessary followed by <h3><strong>Subheading</strong></h3> and the heading as <h2><strong>heading</strong></h2> . In addition make sure to base the type of paper on the user INPUT, the type of paper should be either observational or experiment."""

feedback = """Based on the above guidelines generate a score for this specific section of the header based on the following user INPUT. Next give feedback on how to improve your response in a set of bullet points. For the bullet points only criticize on what the user did not follow. If the INPUT followed all the guidelines give a score of 100. Output your response in the following format:
score/nb bullet1/nb bullet2/nb bullet3/nb ...
"""

rephrase = """"""