// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistry {
    struct Student {
        string name;
        uint age;
        bool isRegistered;
    }

    mapping(address => Student) private students;

    function register(string calldata name, uint age) external {
        require(!students[msg.sender].isRegistered, "Already registered");
        require(age > 0, "Invalid age");

        students[msg.sender] = Student({
            name: name,
            age: age,
            isRegistered: true
        });
    }

    function getStudent(address user) external view returns (string memory name, uint age, bool isRegistered) {
        Student memory s = students[user];
        return (s.name, s.age, s.isRegistered);
    }

    function isStudentRegistered(address user) external view returns (bool) {
        return students[user].isRegistered;
    }
}
