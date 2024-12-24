from flask import Flask, request, jsonify, render_template
from twilio.rest import Client

app = Flask(__name__)

# Credenciais da Twilio
ACCOUNT_SID = "AC93bd21ec53faa0a2af9836c1bfe47894"
AUTH_TOKEN = "f335b602ad226657ea7d9831bca3bbb3"
TWILIO_PHONE_NUMBER = "+12185035061"

client = Client(ACCOUNT_SID, AUTH_TOKEN)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def send_message():
    # Obtendo dados do formulário
    data = request.get_json()
    numbers = [number.strip() for number in data['numbers'].split(',')]
    message = data['message']

    # Enviando mensagem para cada número
    for number in numbers:
        message_sent = client.messages.create(
            to=number,
            from_=TWILIO_PHONE_NUMBER,
            body=message
        )

    return jsonify({"status": "Mensagens enviadas com sucesso!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
