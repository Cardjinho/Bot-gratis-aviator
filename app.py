from flask import Flask, render_template, request, jsonify
from twilio.rest import Client

app = Flask(__name__)

# Credenciais Twilio
ACCOUNT_SID = "AC93bd21ec53faa0a2af9836c1bfe47894"
AUTH_TOKEN = "f335b602ad226657ea7d9831bca3bbb3"
TWILIO_PHONE_NUMBER = "+12185035061"

client = Client(ACCOUNT_SID, AUTH_TOKEN)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def send_sms():
    data = request.json
    numbers = data['numbers']
    message = data['message']

    for number in numbers:
        client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=number.strip()
        )

    return jsonify({'status': 'Mensagens enviadas com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True)
