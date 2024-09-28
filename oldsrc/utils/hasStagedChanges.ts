import shell from "shelljs";

// check if there is exisiting staged commit
const hasStagedChanges = () => {
	// check if there are staged changes
	const gitStatus = shell.exec("git status --porcelain", {
		silent: true,
	}).stdout;
	// Parse the status output
	const stagedChanges = gitStatus
		.split("\n")
		.filter((line) => line.startsWith("A ") || line.startsWith("M "));
	if (stagedChanges.length === 0) {
		console.log(
			"You have no changes staged for commit. Please stage you commit before continuing!",
		);
	} else {
		return true;
	}
};

export default hasStagedChanges;
