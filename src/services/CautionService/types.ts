// services/CautionService/types.ts

export type CreateCautionItemRequest = {
  materialId: string;
  quantity: number;
  deliveryDate?: string;
};

export type CreateCautionRequest = {
  militaryId: string;
  observations?: string;
  items: CreateCautionItemRequest[];
};