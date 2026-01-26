export const Roles = ['admin', 'manager', 'seller', 'support', 'user'];

export const Order_Status = [
    'processing',
    'confirmed',
    'packed',
    'shipped',
    'outfordelivery',
    'delivered',
    'cancelled'
];

export const Product_Status = [
    'pending',
    'active',
    'inactive',
    'rejected'
];

export const Payment_Status = [
    'pending',
    'paid',
    'failed',
    'refunded'
];

export const Credit_Type = [
    'SALE',
    'REFUND',
    'PAYOUT',
    'INVENTORY_HOLD',
    'INVENTORY_RELEASE',
    'PLATFORM_FEE'
];

export const Credit_Status = [
    'PENDING',
    'COMPLETED',
    'FAILED'
];

export const Payout_Status = [
    'PENDING',
    'PROCESSING',
    'PAID',
    'FAILED'
];

export const Ledger_Type = [
    'SALE',
    'REFUND',
    'COMMISSION',
    'ADJUSTMENT'
];

export const Payment_Method = ['BANK_TRANSFER', 'UPI'];