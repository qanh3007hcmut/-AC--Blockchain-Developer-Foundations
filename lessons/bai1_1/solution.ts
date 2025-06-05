
export type Block = {
	index: number;
	timestamp: string;
	transactions: any[];
	previous_hash: string;
	current_hash: string;
};

// ✍️ TODO: Viết hàm tại đây
export function isValidBlock(block: Block): boolean {
	let hashVal = ""
	Object.entries(block).forEach(([key, value]) => {
		hashVal += key != "current_hash" ? 
					(key == "transactions" ? JSON.stringify(value) : value + "") 
					: "";
		// console.log(hashVal);
	});
	const hash = crypto.createHash('sha256').update(hashVal).digest('hex')
	return hash === block.current_hash ? true : false; // Chỉnh lại logic
}