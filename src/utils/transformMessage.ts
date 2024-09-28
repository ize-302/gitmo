import emojisData from "@/emojis-data.json";
import optionsPrompt from "./optionsPrompt.js";

// this adds appropriate emoji to message
const transformMessage = async (originalMessage: string) => {
	const prefixes = ["feat", "fix", "docs", "style", "refactor", "perf", "test", "ci", "build", "chore", "revert"];
	const getMatchedPrefix = prefixes.find((prefix) => originalMessage.startsWith(prefix));
	if (getMatchedPrefix) {
		const findMatchedEmoji = emojisData.find((item) => item.name === getMatchedPrefix);
		return `${originalMessage} ${findMatchedEmoji?.emoji}`;
	}
	console.log("Not a conventional commit");
	await optionsPrompt();
	return;
};

export default transformMessage;
