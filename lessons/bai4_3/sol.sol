// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    address public owner;
    uint public candidateCount;

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    event Voted(address indexed voter, uint indexed candidateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string calldata name) external onlyOwner {
        candidates[candidateCount] = Candidate({ name: name, voteCount: 0 });
        candidateCount++;
    }

    function vote(uint candidateId) external {
        require(!hasVoted[msg.sender], "Already voted");
        require(candidateId < candidateCount, "Invalid candidate ID");

        candidates[candidateId].voteCount += 1;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, candidateId);
    }

    function getCandidate(uint candidateId) external view returns (string memory name, uint voteCount) {
        require(candidateId < candidateCount, "Candidate does not exist");
        Candidate memory c = candidates[candidateId];
        return (c.name, c.voteCount);
    }
}
