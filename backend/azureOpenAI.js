import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env.OPENAI_END_POINT;
const deployment = "gpt-4-mahmoud";
const apiKey = process.env.OPENAI_API_KEY;
const apiVersion = "2024-05-01-preview";

const chatPrompt = [
	{
		role: "system",
		content:
			"You are a knowledgeable medical assistant.\
			 Your goal is to help patients by recommending \
			 the appropriate medical specialties for their symptoms,\
			  providing helpful advice about their condition, \
			  and suggesting actionable at-home remedies. Always respond in a structured JSON format\
			 like this: [Specialities: [\"specialty1\", \"specialty2\"], Advice: \"advice\", Remedies: [\"remedy1\", \"remedy2\"]]\
			 make sure to include at least one specialty, one piece of advice, and one remedy.\
			 must be in json format.\
			 your response must be in english.",
	},
	{
		role: "user",
		content: "جسمي سخن وتعبان وكحه.",
	},
];

// Function to call Azure OpenAI Chat Completion
const generateCompletion = async () => {
	try {
		const response = await axios.post(
			`${endpoint}openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`,
			{
				messages: chatPrompt,
				max_tokens: 800,
				temperature: 0.16,
				top_p: 0.73,
				frequency_penalty: 0,
				presence_penalty: 0,
				stream: false,
			},
			{
				headers: {
					"Content-Type": "application/json",
					"api-key": apiKey,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error:", error.response ? error.response.data : error.message);
	}
};


// Call the function
(async () => {
	try {
		const response = await generateCompletion();
		console.log("Response:", response);

		if (response && response.choices) {
			const messageContent = response.choices.message;
			console.log("Message Content:", messageContent);
		} else {
			console.error("Response does not contain 'choices[0].text'");
		}
	} catch (error) {
		console.error("Error:", error.response ? error.response.data : error.message);
	}
})();