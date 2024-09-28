import prompts from "prompts";

const onCancel = () => {
	console.log("Exited Gitmo!");
	process.exit(1);
};

const optionsPrompt = async () => {
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

export default optionsPrompt;
