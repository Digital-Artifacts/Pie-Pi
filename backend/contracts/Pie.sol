// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pie is ERC20, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        address _to
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(_to, 1_000_000 * 10**decimals());
    }
}
