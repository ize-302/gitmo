import prompts from "prompts";
import FLAGS from "@/constants/flags.js";
import commitTypes from "@/commit-types.json";
import shell from "shelljs";

shell.config.silent = false;

const validateCommand = (cli) => {
  const validFlagsArray = Object.values(FLAGS);
  const inputFlagsArray = Object.keys(cli.flags);

  const result = inputFlagsArray.filter(
    (element) => !validFlagsArray.includes(element)
  );

  if (result.length > 0) {
    console.log(`unknown option -${result[0]}`);
    cli.showHelp();
    return;
  }
};

const onCancel = () => {
  console.log("Exited Gitmo!");
  process.exit(1);
};

const isConventionalCommit = async (commitMessage) => {
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
  } else {
    return false;
  }
};

const showCommitPrompt = async () => {
  // check if there are staged changes
  const status = shell.exec('git status --porcelain', { silent: true }).stdout;
  // Parse the status output
  const stagedChanges = status.split('\n').filter(line => line.startsWith('A ') || line.startsWith('M '));
  if (stagedChanges.length === 0) {
    console.log('You have no changes staged for commit!');
    return;
  }

  const response = await prompts(
    {
      type: "text",
      name: "commitMessage",
      message: "commit message",
    },
    { onCancel }
  );
  const { commitMessage } = response;
  if (commitMessage) {
    const ctype = await isConventionalCommit(commitMessage);
    if (ctype) {
      const updatedCommitMessage = response.commitMessage + " " + ctype?.emoji;
      console.log("COMMIT MESSAGE:", updatedCommitMessage);
      shell.exec(`git commit -m '${updatedCommitMessage}'`);
    } else {
      console.log(
        "Commit message does not align with the specifications of conventional commit"
      );
      const response = await prompts(
        {
          type: "select",
          name: "continue",
          message: "continue anyway?",
          choices: [
            { title: "Yes", value: "yes" },
            { title: "Cancel", value: "cancel" },
          ],
          instructions: false,
        },
        { onCancel }
      );
      response.continue === "yes"
        ? shell.exec(`git commit -m '${commitMessage}'`)
        : onCancel();
    }
  } else {
    console.log("Commit message cant be empty");
    await showCommitPrompt();
  }
};

export const handleCommand = (cli) => {
  if (!shell.which("git")) {
    shell.echo("Sorry, this script requires git");
    shell.exit(1);
  }

  validateCommand(cli);
  if (cli.flags.version) {
    console.log(`${cli.pkg.name} version ${cli.pkg.version}`);
  } else if (cli.flags.help) {
    cli.showHelp();
  } else if (cli.flags.update) {
    console.log("update cli");
  } else if (cli.flags.commit) {
    showCommitPrompt();
  }
};
