import shell from "shelljs";

const hasStagedChanges = () => {
	const gitStatus = shell.exec("git status --porcelain", {
		silent: true,
	}).stdout;
	const stagedChanges = gitStatus.split("\n").filter((line) => /^[AM] /.test(line));

	if (stagedChanges.length === 0) {
		console.log("You have no changes staged for commit. Please stage your commit before continuing!");
		return false;
	}
	return true;
};

export default hasStagedChanges;
