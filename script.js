
const sid = "AC93bd21ec53faa0a2af9836c1bfe47894";
const token = "4147a5a5f18143d552d33aa365dd099f";
const twilioNumber = "+12185035061"; // Número registrado no Twilio

const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;

document.getElementById("messageForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const to = document.getElementById("to").value; // Número de destino
    const message = document.getElementById("message").value; // Mensagem

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${btoa(`${sid}:${token}`)}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                From: twilioNumber,
                To: to,
                Body: message,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("response").innerText = "Mensagem enviada com sucesso!";
        } else {
            const error = await response.json();
            document.getElementById("response").innerText = `Erro: ${error.message}`;
        }
    } catch (error) {
        document.getElementById("response").innerText = "Erro ao enviar a mensagem.";
        console.error(error);
    }
});
