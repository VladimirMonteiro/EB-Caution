// ─── Enums ────────────────────────────────────────────────────────────────────

export type Situation = "ACTIVE" | "INACTIVE";

// ─── Entities ─────────────────────────────────────────────────────────────────

export interface MilitaryResponse {
  id: string;
  warName: string;
  cpf: string;
  email: string;
  phone: string;
  cia: string;
  pel: string;
  grad: string;
  status: Situation;
}

/** Mirrors CreateMilitaryRequestDTO from the backend */
export interface CreateMilitaryRequest {
  warName: string;
  cpf: string;
  email: string;
  phone: string;
  cia: string;
  pel: string;
  grad: string;
  status: Situation;
}

export type UpdateMilitaryRequest = Partial<CreateMilitaryRequest>;

// ─── Component prop types ─────────────────────────────────────────────────────

export interface MilitaryListProps {
  onNovo?: () => void;
  onEditar?: (militar: MilitaryResponse) => void;
}

export interface MilitaryCardProps {
  military: MilitaryResponse;
  loadingDelete: string | null;
  onEditar?: (m: MilitaryResponse) => void;
  onExcluir: (m: MilitaryResponse) => void;
}

export interface MilitaryFormProps {
  /** When provided, form is in edit mode and fields are pre-filled */
  military?: MilitaryResponse | null;
  /**
   * Called with the stripped payload. The page decides create vs update
   * and delegates to the hook.
   */
  onSuccess: (payload: CreateMilitaryRequest) => Promise<void>;
  onCancel: () => void;
  /** Passed from the hook so the submit button shows a spinner */
  loadingSubmit: boolean;
}
