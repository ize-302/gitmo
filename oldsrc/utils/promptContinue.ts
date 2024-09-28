import prompts from "prompts";
import onCancel from "./onCancel.js";

const promptContinue = async () => {
	const response = await prompts(
		{
			type: "select",
			name: "continue",
			message: "Not a conventional commit. continue anyway?",
			choices: [
				{ title: "Yes", value: "yes" },
				{ title: "Edit commit message", value: "correction" },
				{ title: "Cancel", value: "cancel" },
			],
			instructions: false,
		},
		{ onCancel },
	);
	return response;
};

export default promptContinue;
