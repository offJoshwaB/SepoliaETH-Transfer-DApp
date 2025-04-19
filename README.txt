
🚀 Sepolia Ethereum DApp - Send Crypto

This is a decentralized web application (DApp) that allows users to **send and receive Ethereum** on the **Sepolia test network**. It is built using **React**, **Solidity**, **Hardhat**, and **Alchemy**, with MetaMask integration for wallet connectivity.

🌐 Live Demo
> Coming Soon!

📌 Features
- 🦊 Connect MetaMask wallet
- 🔒 Send ETH securely to any address
- 🖼️ Dynamic GIF based on keywords
- 📜 Smart contract deployed on Sepolia
- 📊 Transaction history display

🧰 Tech Stack

Frontend
- React.js
- Tailwind CSS
- JavaScript
- Ethers.js

Smart Contract
- Solidity
- Hardhat
- Alchemy (RPC Provider)

Wallet & Network
- MetaMask
- Sepolia Testnet

📦 Installation

1. Clone the repository
   git clone https://github.com/your-username/sepolia-ethereum-dapp.git
   cd sepolia-ethereum-dapp

2. Install dependencies
   npm install

3. Start the React app
   npm run dev

📂 Project Structure
📁 client/               # React frontend
📁 contracts/            # Solidity smart contract
📁 context/              # React context for Web3 state
📁 hooks/                # Custom hooks (e.g. for fetching GIFs)
📁 utils/                # Utility functions
📄 Transactions.sol      # Main smart contract
📄 hardhat.config.js     # Hardhat configuration

📜 Smart Contract Functions
- addToBlockchain(address, amount, message, keyword)
- getAllTransactions()
- getTransactionCount()

🧪 Testing
Use the Hardhat environment to test the contract:
npx hardhat test

🐞 Common Issues
- MetaMask not connected → Make sure MetaMask is installed and set to Sepolia testnet.
- Contract not deployed → Check if deployed address is correct in constants.js.

📷 Screenshots
> Add screenshots of UI and terminal logs here.

🔗 References
- MetaMask Docs: https://docs.metamask.io
- Ethers.js: https://docs.ethers.io/
- Hardhat: https://hardhat.org
- Alchemy: https://www.alchemy.com

🙌 Acknowledgements
Special thanks to the Ethereum and open source developer community for tools and guidance.

📁 Repository Info
Repo Name: sepolia-ethereum-dapp
Author: Your Name
GitHub: https://github.com/your-username

📌 License
This project is licensed under the MIT License.
