export interface CreateLoadRequest {
  pelName: string;
  cia: string;
}

export interface CreateLoadItemRequest {
  expectedQuantity: number;
  description: string;
}

export interface UpdateLoadItemRequest {
  expectedQuantity: number;
  description: string;
}

export interface LoadResponse {
  loadId: string;
  pelName: string;
  cia: string;
  createdAt: string;
}

export interface LoadItemResponse {
  materialId: string;
  name: string;
  expectedQuantity: number;
  description: string;
}

export interface LoadDetailsResponseDTO {
  loadId: string;
  pelName: string;
  cia: string;
  createdAt: string;
  items: LoadItemResponse[];
}
