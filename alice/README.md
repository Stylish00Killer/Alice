# Alice Bot

This is a WhatsApp bot built using `whatsapp-web.js`.

## Prerequisites

- Node.js (LTS version recommended)
- npm

## Installation

1.  Navigate to the `alice` directory.
2.  Install the dependencies:
    ```bash
    npm install
    ```

## Running the Bot

1.  Run the bot using the following command:
    ```bash
    node index.js
    ```
2.  On the first run, a QR code will be displayed in the terminal. Scan this QR code with your WhatsApp mobile app (from `Settings > Linked Devices > Link a Device`).
3.  Once you have successfully scanned the QR code, the bot will be logged in and ready to receive commands. Your session will be saved locally in the `.wwebjs_auth` directory, so you won't need to scan the QR code on subsequent runs.

## Commands

- `!ping`: The bot will reply with "pong".
- `!echo <message>`: The bot will reply with the message you provided.
