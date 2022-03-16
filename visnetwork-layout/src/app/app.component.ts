import { Component } from '@angular/core';
import { Data, Edge, Node, Options } from 'vis-network';
import { DataSet } from 'vis-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public options: Options;
  public data: Data = {};

  private nodes: DataSet<Node> | undefined;
  private edges: DataSet<Edge> | undefined;

  public constructor() {
    this.options = this.getOptions();
    this.getData();
  }

  /**
   * Gets all the circuits for the device.
   */
  private getData(): void {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push({ id: 1, label: 'first', group: 'pdu' });

    this.nodes = new DataSet(nodes);
    this.edges = new DataSet<Edge>(edges);

    this.data = {
      nodes: this.nodes,
      edges: this.edges,
    };
  }

  /**
   * Gets the options for the visualizer.
   * @returns The options to use.
   */
  private getOptions(): Options {
    return {
      physics: {
        enabled: true,
        solver: 'repulsion',
        repulsion: {
          nodeDistance: 150,
        },
      },
      autoResize: false,
      nodes: {
        shape: 'dot',
        size: 20,
        font: {
          size: 12,
          color: '#000000',
        },
        borderWidth: 2,
      },
      edges: {
        color: 'black',
        font: {
          size: 8,
        },
      },
      groups: {
        pdu: {
          color: { background: '#A7E8DF', border: 'black' },
          shape: 'box',
        },
        circuit: {
          color: { background: '#80418A', border: 'black' },
          shape: 'dot',
        },
        rack: {
          color: { background: '#32E875', border: 'black' },
          shape: 'ellipse',
        },
        allocated: {
          color: { background: '#e76f51', border: 'black' },
          shape: 'dot',
        },
        available: {
          color: { background: '#99d98c', border: 'black' },
          shape: 'dot',
        },
      },
    };
  }
}
