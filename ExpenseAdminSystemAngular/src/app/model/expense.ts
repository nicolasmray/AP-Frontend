export interface Expense {
    id: number;
    userId: number;
    amount: number;
    expenseDate: Date;
    categoryId: number;
    currencyId: number;
    comments: string;
    createdAt: Date;
}
