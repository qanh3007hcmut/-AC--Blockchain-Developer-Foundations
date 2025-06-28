// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistryV2 {
    struct Student {
        string name;
        uint age;
        bool isRegistered;
    }

    address public owner;

    mapping(address => Student) private students;

    event StudentRegistered(address indexed studentAddress, string name, uint age);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function register(address studentAddr, string calldata name, uint age) external onlyOwner {
        require(!students[studentAddr].isRegistered, "Already registered");
        require(age > 0, "Invalid age");

        students[studentAddr] = Student({
            name: name,
            age: age,
            isRegistered: true
        });

        emit StudentRegistered(studentAddr, name, age);
    }

    function getStudent(address user) external view returns (string memory name, uint age, bool isRegistered) {
        Student memory s = students[user];
        return (s.name, s.age, s.isRegistered);
    }

    function isStudentRegistered(address user) external view returns (bool) {
        return students[user].isRegistered;
    }
}
