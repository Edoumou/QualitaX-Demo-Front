export const getContract = async (web3, contractInterfaceJSON, contractAddress) => {
    return new web3.eth.Contract(
        contractInterfaceJSON,
        contractAddress
    );
}