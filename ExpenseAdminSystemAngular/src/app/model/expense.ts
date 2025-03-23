export interface Expense {
    id: number;
    user_id: number;
    amount: number;
    expenseDate: Date;
    category_id: number;
    currency_id: number;
    comments: string;
    createdAt: Date;
}
