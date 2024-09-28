import prompts from "prompts";
import isConventionalCommit from "./isConventionalCommit.js";
import onCancel from "./onCancel.js";
import promptContinue from "./promptContinue.js";

const showCommitMessagePrompt = async () => {
	const response = await prompts(
		{
			type: "text",
			name: "commitMessage",
			message: "commit message",
		},
		{ onCancel },
	);
	const { commitMessage } = response;
	let updatedCommitMessage = "";
	const isValidCommit = await isConventionalCommit(commitMessage);
	if (isValidCommit) {
		updatedCommitMessage = `${response.commitMessage} ${isValidCommit?.emoji}`;
	} else {
		console.log(
			"Commit message does not align with the specifications of conventional commit",
		);
		const response = await promptContinue();
		if (response.continue === "yes") {
			updatedCommitMessage = commitMessage;
		} else {
			onCancel();
		}
	}
	return updatedCommitMessage;
};

export default showCommitMessagePrompt;
