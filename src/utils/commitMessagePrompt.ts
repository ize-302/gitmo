import prompts from "prompts";
import onCancel from "@/utils/onCancel.js";

const commitMessagePrompt = async (originalMessage?: string) => {
	const commitMessageResponse = await prompts(
		{
			type: "text",
			name: "commitMessage",
			message: "commit message",
			initial: originalMessage,
		},
		{ onCancel },
	);
	return commitMessageResponse;
};

export default commitMessagePrompt;
