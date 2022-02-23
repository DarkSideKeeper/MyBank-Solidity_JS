const displayTotalBankAmount = async (contract) => {
    const balance = await contract.methods.totalBankAmount().call();
    const etherValue = Web3.utils.fromWei(balance, 'ether');
    $("#_totalBankAmount").html(etherValue + "(ETH)");
}

const displayMyAddress = async (accounts) => {
    $("#_address").html(accounts[0]);
}

const displayMyBalance = async (contract) => {
    const balance = await contract.methods._balance().call();
    const etherValue = Web3.utils.fromWei(balance, 'ether');
    $("#_balance").html(etherValue + "(ETH)");
}

const depositMoney = (contract, accounts) => {
    let input;
    let inputAddress;
    $("#input_deposit").on("change", (e) => {
        input = e.target.value;
    });

    $("#input_withdraw").on("change", (e) => {
        input = e.target.value;
    });

    $("#input_address").on("change", (e) => {
        inputAddress = e.target.value;
    });

    $("#input_transfer").on("change", (e) => {
        input = e.target.value;
    });

    $("#form").on("submit", async (e) => {
        e.preventDefault();
        callDeposet(contract, accounts[0], input).then(() => {
            displayTotalBankAmount(contract);
            displayMyBalance(contract);
        })
    })

    $("#form1").on("submit", async (e) => {
        e.preventDefault();
        callWithdraw(contract, accounts[0], input).then(() => {
            displayTotalBankAmount(contract);
            displayMyBalance(contract);
        })
    })

    $("#form2").on("submit", async (e) => {
        e.preventDefault();
        callTransfer(contract, accounts[0], inputAddress, input).then(() => {
            displayTotalBankAmount(contract);
            displayMyBalance(contract);
        })
    })
}

async function callDeposet(contract, account, input) {
    const value = Web3.utils.toWei(input, 'ether');
    return await contract.methods.deposit().send({ from: account, value: value, gas: 70000 });
};

async function callWithdraw(contract, account, input) {
    const value = Web3.utils.toWei(input, 'ether');
    return await contract.methods.withdraw(value).send({ from: account, value: value, gas: 70000 });
};

async function callTransfer(contract, account, toAccount, input) {
    const value = Web3.utils.toWei(input, 'ether');
    return await contract.methods.transfer(toAccount, value).send({ from: account, gas: 70000 });
};

async function MyBankApp() {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getContract(web3);

    displayTotalBankAmount(contract);
    displayMyAddress(accounts);
    displayMyBalance(contract);
    depositMoney(contract, accounts)
}

MyBankApp();