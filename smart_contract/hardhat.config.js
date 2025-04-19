//https://eth-sepolia.g.alchemy.com/v2/IjCDuve3Se0kUlQMVmnQPaKJ17k0zT5W

require('@nomicfoundation/hardhat-ethers')

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url : 'https://eth-sepolia.g.alchemy.com/v2/IjCDuve3Se0kUlQMVmnQPaKJ17k0zT5W',
      accounts: [ 'a39a8c75e9199a91b980c8daaea6749e4cce26ed1969d86fcb775134cb5129b0' ]
    }
  }
}