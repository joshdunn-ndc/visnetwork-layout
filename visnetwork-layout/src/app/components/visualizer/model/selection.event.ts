import { Position } from 'vis-network';

/**
 * Defines the data for a canvas selection event.
 */
export interface SelectionEvent {
  /**
   * The edges that were selected.
   */
  edges: string[];

  /**
   * The raw DOM event.
   */
  event: PointerEvent;

  /**
   * The nodes that were selected.
   */
  nodes: number[];

  /**
   * The pointer data in both DOM and canvas space.
   */
  pointer: DOMToCanvas;
}

/**
 * Defines a mapping of DOM position to canvas position.
 */
interface DOMToCanvas {
  /**
   * The DOM position.
   */
  dom: Position;

  /**
   * The canvas postion.
   */
  canvas: Position;
}
