import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Data, Network, Options } from 'vis-network';
import { SelectionEvent } from './model/selection.event';

/**
 * Defines a wrapper component for the vis-network visualizer.
 */
@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss'],
})
export class VisualizerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { read: ElementRef })
  public container!: ElementRef;

  @Input()
  public data: Data = {};

  @Input()
  public options: Options = {};

  @Output()
  public nodeSelected: EventEmitter<SelectionEvent> = new EventEmitter<SelectionEvent>();

  @Output()
  public edgeSelected: EventEmitter<SelectionEvent> = new EventEmitter<SelectionEvent>();

  @Output()
  public stabilized: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public nodeDeselected: EventEmitter<void> = new EventEmitter<void>();

  public network?: Network;

  /**
   * @inheritdoc
   */
  public ngAfterViewInit(): void {
    this.network = new Network(
      this.container.nativeElement as HTMLDivElement,
      this.data,
      this.options
    );
    this.wireEventEmitters();
  }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.network?.destroy();
  }

  /**
   * Refreshes the data in the network.
   */
  public refreshData(data: Data): void {
    this.network?.setData(data);
  }

  /**
   * Resizes the canvas using the given width and height.
   * @param width  The width to use.
   * @param height The height to use.
   */
  public resizeCanvas(width: number, height: number): void {
    this.network?.setSize(`${width}px`, `${height}px`);
    this.network?.redraw();
  }

  /**
   * Wire up the basic event emitters.
   */
  private wireEventEmitters(): void {
    this.network?.on('selectNode', (params: SelectionEvent) =>
      this.nodeSelected.emit(params)
    );
    this.network?.on('selectEdge', (params: SelectionEvent) =>
      this.edgeSelected.emit(params)
    );
    this.network?.on('stabilized', () => this.stabilized.emit());
    this.network?.on('deselectNode', () => this.nodeDeselected.emit());
  }
}
