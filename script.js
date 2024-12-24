document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const to = document.getElementById('to').value;
    const message = document.getElementById('message').value;

    const sid = "AC93bd21ec53faa0a2af9836c1bfe47894";
    const token = "8cbe0a522101cb6a96f2de0329682748";
    const twilioNumber = "+12185035061";

    const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${btoa(`${sid}:${token}`)}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                From: twilioNumber,
                To: to,
                Body: message
            })
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('response').innerText = "Mensagem enviada com sucesso!";
        } else {
            const error = await response.json();
            document.getElementById('response').innerText = `Erro: ${error.message}`;
        }
    } catch (error) {
        document.getElementById('response').innerText = "Erro ao enviar a mensagem.";
    }
});
