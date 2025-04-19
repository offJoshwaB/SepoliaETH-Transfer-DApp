import React, { useEffect, useState } from "react";
import { ethers } from "ethers";  // Import ethers as default
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionsContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);  // Use ethers.BrowserProvider in v6
    const signer = await provider.getSigner();  // Get the signer asynchronously
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const getAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract = createEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
    
            const structuredTransactions = availableTransactions.map((transaction) => ({
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
              amount: parseInt(transaction.amount.toString(16)) / (10 ** 18)
            }));
    
            console.log(structuredTransactions);
    
            setTransactions(structuredTransactions);
          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
        }
      };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                await getAllTransactions();
            } else {
                console.log('No Account found');
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    };

    const checkIfTransactionsExists = async () => {
        try {
          const { ethereum } = window;
      
          if (!ethereum) {
            console.log("MetaMask not installed");
            throw new Error("No ethereum object");
          }
      
          const transactionsContract = createEthereumContract();
          const currentTransactionCount = await transactionsContract.getTransactionCount();
      
          window.localStorage.setItem("transactionCount", currentTransactionCount);
        } catch (error) {
          console.log("Error in checkIfTransactionsExists:", error.message);
          throw error;
        }
      };
      



    const sendTransaction = async () => {
        console.log("Sending transaction..."); 
        if (!window.ethereum) {
            alert("Please install MetaMask to continue!");
            return;
        }

        try {

            

            
            const { addressTo, amount, keyword, message } = formData;

            const parsedAmount = ethers.parseEther(amount); // Updated for Ethers.js v6
            const transactionsContract = await createEthereumContract();
            // const transactionsContract = getEthereumContract();
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                  from: currentAccount,
                  to: addressTo,
                  gas: "0x5208",
                  value: parsedAmount.toString(16),
                }],
              });

            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);


            const transactionsCount = await transactionsContract.getTransactionCount();
            // console.log("Checking method:", typeof transactionsContract.getTransactionCount);
            setTransactionCount(Number(transactionsCount));
            window.location.reload()

        

        } catch (error) {
            console.error("Transaction failed:", error); // Log the actual error message
            alert("Something went wrong. Check the console for details.");
        }
        
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        //checkIfTransactionsExists();
    }, []);

    return (
        <TransactionsContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions }}>
            {children}
        </TransactionsContext.Provider>
    );
};
