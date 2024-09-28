import commitTypes from "@/commit-types.json";

const isConventionalCommit = async (commitMessage: string) => {
	if (
		commitMessage.startsWith("feat") ||
		commitMessage.startsWith("fix") ||
		commitMessage.startsWith("docs") ||
		commitMessage.startsWith("style") ||
		commitMessage.startsWith("refactor") ||
		commitMessage.startsWith("perf") ||
		commitMessage.startsWith("test") ||
		commitMessage.startsWith("ci") ||
		commitMessage.startsWith("build") ||
		commitMessage.startsWith("chore") ||
		commitMessage.startsWith("revert")
	) {
		/**
		 * Here is the structure of a typical conventional commit message
		 * type(scope): commit message
		 *
		 * Note: I want to extract the type i.e the string that comes before "(scope)"
		 * */
		// Find the index of the opening parenthesis and colon
		const parenthesisIndex = commitMessage.indexOf("(");
		const colonIndex = commitMessage.indexOf(":");
		// Determine the end index for the substring (whichever comes first)
		const endIndex = parenthesisIndex !== -1 ? parenthesisIndex : colonIndex;
		// Extract the substring from the start to the end index
		const beforeColon = commitMessage.substring(0, endIndex).trim();
		return commitTypes.find((item) => item.name === beforeColon);
	}
};

export default isConventionalCommit;
