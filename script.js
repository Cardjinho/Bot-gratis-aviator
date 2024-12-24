document.getElementById('smsForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const numbers = document.getElementById('numbers').value.split(',');
    const message = document.getElementById('message').value;

    const response = await fetch('/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numbers, message })
    });

    const result = await response.json();
    document.getElementById('response').innerText = result.status;
});
