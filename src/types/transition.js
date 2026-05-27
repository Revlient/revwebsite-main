/**
 * @typedef {Object} TransitionState
 * @property {boolean} isTransitioning
 * @property {string} currentPage
 * @property {string|null} targetPage
 *
 * @typedef {Object} TransitionContextType
 * @property {TransitionState} state
 * @property {(target: string) => void} navigate
 * @property {() => void} onCovered
 */

export {};