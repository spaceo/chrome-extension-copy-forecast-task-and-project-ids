
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

document.addEventListener('DOMContentLoaded', function() {
    const status = document.getElementById('status');
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        const tabUrl = tabs[0].url;
        const projectAndTaskIdMatch = tabUrl.match(/project\/(P-[0-9]+)\/workflow\/(T[0-9]+)/);

        if (
            !projectAndTaskIdMatch
            || projectAndTaskIdMatch[1] === undefined
            || projectAndTaskIdMatch[2] === undefined
        ) {
            status.innerHTML = 'No project or task id was found';
            return;
        }

        const projectId = projectAndTaskIdMatch[1].replace('-', '');
        const taskId = projectAndTaskIdMatch[2];
        const prefix = `${taskId}`;

        copyToClipboard(prefix);

        status.innerHTML = `Forecast task id: <span class="what-was-copied">"${prefix}"</span> has been copied to your clipboard`;
        status.innerHTML += `<div>Link to task: <a href="https://app.forecast.it/project/${projectId}/workflow/${taskId}">https://app.forecast.it/project/${projectId}/workflow/${taskId}</a></div>`;
    });
}, false);
