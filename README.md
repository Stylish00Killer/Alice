# Alice WhatsApp Bot 🤖📱

**Alice** is a powerful and modular Node.js WhatsApp bot built using the [Baileys](https://github.com/WhiskeySockets/Baileys) library. It's designed for efficient group management and moderation, running directly from your terminal.

---

## ✨ Key Features

- **Modular Command System:** Easily add or extend commands.
- **Automated Moderation:** Includes anti-spam and anti-link middleware to keep groups clean.
- **Permission System:** Granular control over command usage (owner-only, admin-only).
- **Session Persistence:** The bot remembers its session, so you only need to pair it once.
- **QR Code in Terminal:** No need for an external browser to log in.

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Git](https://git-scm.com/)

---

## 🚀 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/whatsapp-bot.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd whatsapp-bot
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

---

## ⚙️ Configuration

All configuration is done in the `config.js` file. You **must** edit this file before starting the bot.

```javascript
// config.js
module.exports = {
  // The bot's own WhatsApp number.
  // IMPORTANT: Use only the numbers, without '+' or any spaces.
  botNumber: ["917866993794"],

  // Phone numbers of the bot owners. Owners have full access to all commands.
  // IMPORTANT: Use the same format as botNumber.
  owners: ["918927805203", "918617692260"],

  // The prefix for all commands.
  prefix: '.',

  // Configuration for the anti-flood middleware.
  antiFlood: {
    limit: 10, // Max messages allowed
    interval: 25 // in seconds
  }
}
```

---

## ▶️ Running the Bot

1.  **Start the bot:**
    ```bash
    npm start
    ```

2.  **Pair the bot:**
    - On the first run, a QR code will be displayed in your terminal.
    - Open WhatsApp on your phone, go to **Settings > Linked Devices > Link a Device**, and scan the QR code.
    - The bot will then connect and be ready for use. The session will be saved in the `auth/` directory for future runs.

---

## 🤖 Available Commands

The default command prefix is `.`

| Command     | Description                                       | Permissions      | Usage                  |
|-------------|---------------------------------------------------|------------------|------------------------|
| `ping`      | Checks if the bot is responsive.                  | None             | `.ping`                |
| `afk [reason]` | Sets your status to AFK. Pings will be replied to. | None             | `.afk working on a bug`|
| `group`     | Opens or closes the group for all members.        | Group, Admin     | `.group <open/close>`  |
| `grouplink` | Gets the invite link for the current group.       | Group, Admin     | `.grouplink`           |
| `hidetag`   | Tags all members of a group in a hidden message.  | Group, Admin     | `.hidetag <message>`   |
| `kick`      | Removes a user from the group.                    | Group, Admin     | `.kick @user`          |
| `remove`    | An alias for the `kick` command.                  | Group, Admin     | `.remove @user`        |
| `tagall`    | Tags all members of a group with a message.       | Group, Admin     | `.tagall <message>`    |
| `close-all` | Closes all groups where the bot is an admin.      | Owner            | `.close-all`           |
| `open-all`  | Opens all groups where the bot is an admin.       | Owner            | `.open-all`            |

**Permission Definitions:**
- **None:** Anyone can use this command.
- **Group:** The command must be used in a group chat.
- **Admin:** The user must be a group admin.
- **Owner:** The user's number must be in the `owners` list in `config.js`.

---

## 📁 Project Structure

```
.
├── commands/       # All bot commands
├── events/         # Event handlers (e.g., message, group updates)
├── middleware/     # Middleware for processing messages (e.g., anti-link, permissions)
├── utils/          # Utility functions
├── auth/           # Stores session files (auto-generated)
├── config.js       # Main configuration file
├── index.js        # Application entry point
└── package.json    # Project dependencies and scripts
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project does not have a license.
