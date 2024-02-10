from brownie import MyToken, accounts, network

def main():
    # Set the deployer account
    deployer = '0x3896DCd1175644BfFCc454A2b3Fe403eA1939bE5'

    # Specify the addresses for the MINTER and BURNER roles
    minter_address = '0x3896DCd1175644BfFCc454A2b3Fe403eA1939bE5'
    burner_address = '0x3896DCd1175644BfFCc454A2b3Fe403eA1939bE5'

    # Deploy the MyToken contract
    my_token = MyToken.deploy(
        minter_address,
        burner_address,
        {"from": deployer, "gas_price": "auto", "gas_limit": 1000000}
    )

    print("MyToken deployed at:", my_token.address)

    # # Mint some tokens to addresses
    mint_to_address1 = '0xB137C1Ea53ACA3394d540B4084e92Cb0cDff7A3D'
    # mint_to_address2 = accounts[4]

    mint_amount1 = 20000000000000000000  # 1 ETH in Wei
    # mint_amount2 = 500000000000000000   # 0.5 ETH in Wei

    my_token.mint(mint_to_address1, mint_amount1, {"from": minter_address})
    # my_token.mint(mint_to_address2, mint_amount2, {"from": minter_address})

    print(f"Minted {mint_amount1} tokens to {mint_to_address1}")
    # print(f"Minted {mint_amount2} tokens to {mint_to_address2}")

    # # Print balances after minting
    print("Balances after minting:")
    print(f"{mint_to_address1}: {my_token.balanceOf(mint_to_address1)} tokens")
    # print(f"{mint_to_address2}: {my_token.balanceOf(mint_to_address2)} tokens")

    # # Burn some tokens from addresses
    # burn_from_address1 = mint_to_address1
    # burn_from_address2 = mint_to_address2

    # burn_amount1 = 300000000000000000   # 0.3 ETH in Wei
    # burn_amount2 = 200000000000000000   # 0.2 ETH in Wei

    # my_token.burn(burn_from_address1, burn_amount1, {"from": burner_address})
    # my_token.burn(burn_from_address2, burn_amount2, {"from": burner_address})

    # print(f"Burned {burn_amount1} tokens from {burn_from_address1}")
    # print(f"Burned {burn_amount2} tokens from {burn_from_address2}")

    # # Print balances after burning
    # print("Balances after burning:")
    # print(f"{burn_from_address1}: {my_token.balanceOf(burn_from_address1)} tokens")
    # print(f"{burn_from_address2}: {my_token.balanceOf(burn_from_address2)} tokens")

if __name__ == "__main__":
    main()
