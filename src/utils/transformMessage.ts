import emojisData from "@/emojis-data.json";
import optionsPrompt from "@/utils/optionsPrompt.js";
import commitMessagePrompt from "@/utils/commitMessagePrompt.js";

// this adds appropriate emoji to message
const transformMessage = async (originalMessage: string) => {
	const prefixes = ["feat", "fix", "docs", "style", "refactor", "perf", "test", "ci", "build", "chore", "revert"];
	const getMatchedPrefix = prefixes.find((prefix) => originalMessage.startsWith(prefix));
	if (getMatchedPrefix) {
		const findMatchedEmoji = emojisData.find((item) => item.name === getMatchedPrefix);
		return `${originalMessage} ${findMatchedEmoji?.emoji}`;
	}
	// ("Not a conventional commit. Pick an option to continue");
	const optionsPromptResponse = await optionsPrompt();
	if (optionsPromptResponse.choice === "yes") {
		return originalMessage;
	}
	if (optionsPromptResponse.choice === "correction") {
		const response = await commitMessagePrompt(originalMessage);
		return await transformMessage(response.commitMessage);
	}
};

export default transformMessage;
