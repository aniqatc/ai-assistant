import { printBottomToolbarMessage } from "../ui/bottomToolbar";

const resTime = document.querySelector("#js-response-time");
const resTimeLabel = document.querySelector("#js-response-time-label");
const resLabelStyles = {
  red: ["text-red-600", "dark:text-red-500"],
  green: ["text-green-600", "dark:text-green-500"],
};

function requestCompletionTime(startTime) {
  const timeDifference = Date.now() - startTime;
  const isLongResTime = timeDifference > 5000;

  resTimeLabel.classList.remove(
    ...(isLongResTime ? resLabelStyles.green : resLabelStyles.red),
  );
  resTimeLabel.classList.add(
    ...(isLongResTime ? resLabelStyles.red : resLabelStyles.green),
  );

  resTime.textContent = `${timeDifference / 1000}s`;
  printBottomToolbarMessage("Request completed...");
}

export { requestCompletionTime };
