# 0.21
from brownie import accounts, Lottery, config, network
from web3 import Web3


def test_get_entrance_fee():
    account = accounts[0]
    lottery = Lottery.deploy(
        config["networks"][network.show_active()]["eth_Usd_price_feed"],
        {"from": account},
    )
    assert lottery.getEntranceFee() > Web3.toWei(0.21, "ether")
    assert lottery.getEntranceFee() < Web3.toWei(0.23, "ether")