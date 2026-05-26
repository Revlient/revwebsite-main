export interface TransitionState {
  isTransitioning: boolean;
  currentPage: string;
  targetPage: string | null;
}

export interface TransitionContextType {
  state: TransitionState;
  navigate: (target: string) => void;
  onCovered: () => void;
}
