# ERC20 Token Project

## Setup

1. Cài dependencies:
```bash
npm install
```

## Deploy lên Sepolia

```bash
npx hardhat deploy --network sepolia --tags deploy
```

## Kiểm tra token

Sau khi deploy, cập nhật địa chỉ contract trong `../test.ts` và chạy:
```bash
cd ..
npx ts-node test.ts
```