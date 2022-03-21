import { Component, ElementRef, ViewChild } from '@angular/core';
import { Data, Edge, Node, Options } from 'vis-network';
import { DataSet } from 'vis-data';
import { VisualizerComponent } from './components/visualizer/visualizer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(VisualizerComponent)
  public visualizer!: VisualizerComponent;

  @ViewChild('visualizerContainer', { read: ElementRef })
  public visualizerContainer!: ElementRef;

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

    nodes.push({ id: 1, label: 'HV 01', group: 'HV' });

    nodes.push({ id: 2, label: 'TX 01', group: 'TX' });

    nodes.push({ id: 3, label: 'MSB 01', group: 'MSB' });
    nodes.push({ id: 4, label: 'MSB 02', group: 'MSB' });

    edges.push({ from: 1, to: 2, label: 'FEEDS' });
    edges.push({ from: 2, to: 3, label: 'FEEDS' });
    edges.push({ from: 2, to: 4, label: 'FEEDS' });

    nodes.push({ id: 5, label: 'PDU 1', group: 'pg01' });
    nodes.push({ id: 6, label: 'PDU 2', group: 'pg01' });
    nodes.push({ id: 7, label: 'PDU 3', group: 'pg01' });
    nodes.push({ id: 8, label: 'PDU 4', group: 'PDU' });

    edges.push({ from: 4, to: 5, label: 'FEEDS' });
    edges.push({ from: 4, to: 6, label: 'FEEDS' });
    edges.push({ from: 4, to: 7, label: 'FEEDS' });
    edges.push({ from: 3, to: 8, label: 'FEEDS' });

    nodes.push({ id: 9, label: 'Circuit 1', group: 'cg02' });
    nodes.push({ id: 10, label: 'Circuit 2', group: 'cg02' });
    nodes.push({ id: 11, label: 'Circuit 3', group: 'cg02' });
    nodes.push({ id: 12, label: 'Circuit 4', group: 'cg02' });
    nodes.push({ id: 13, label: 'Circuit 5', group: 'cg01' });
    nodes.push({ id: 14, label: 'Circuit 6', group: 'cg01' });

    edges.push({ from: 6, to: 9, label: 'FEEDS' });
    edges.push({ from: 6, to: 10, label: 'FEEDS' });
    edges.push({ from: 6, to: 11, label: 'FEEDS' });
    edges.push({ from: 6, to: 12, label: 'FEEDS' });
    edges.push({ from: 8, to: 13, label: 'FEEDS' });
    edges.push({ from: 8, to: 14, label: 'FEEDS' });

    this.nodes = new DataSet(nodes);
    this.edges = new DataSet<Edge>(edges);

    this.data = {
      nodes: this.nodes,
      edges: this.edges,
    };
  }

  public ngAfterViewInit(): void {
    if (this.visualizer.network) {
      this.visualizer.network.on('selectNode', (params) => {
        if (params.nodes.length == 1) {
          if (this.visualizer.network!.isCluster(params.nodes[0]) == true) {
            this.visualizer.network!.openCluster(params.nodes[0]);
          }
        }
      });
    }
  }

  public onClusterSwitchboard(): void {
    if (this.visualizer.network) {
      let clusterOptionsByData = {
        joinCondition: function (childOptions: any) {
          console.log('options: ', childOptions);
          return childOptions.group === 'MSB';
        },
        processProperties: function (
          clusterOptions: any,
          childNodes: any,
          childEdges: any
        ) {
          clusterOptions.label = `${childNodes.length} MSB's`;
          return clusterOptions;
        },
        clusterNodeProperties: {
          id: 'MSB Group',
          shape: 'box',
          label: "MSB's",
        },
      };
      this.visualizer.network.cluster(clusterOptionsByData);
    }
  }

  public onClusterPDU(): void {
    if (this.visualizer.network) {
      let clusterOptionsByData = {
        joinCondition: function (childOptions: any) {
          return childOptions.group === 'PDU';
        },
        processProperties: function (
          clusterOptions: any,
          childNodes: any,
          childEdges: any
        ) {
          clusterOptions.label = `${childNodes.length} PDU's`;
          return clusterOptions;
        },
        clusterNodeProperties: {
          id: 'PDU Group',
          shape: 'box',
          label: "PDU's",
        },
      };
      this.visualizer.network.cluster(clusterOptionsByData);

      clusterOptionsByData = {
        joinCondition: function (childOptions: any) {
          return childOptions.group === 'pg01';
        },
        processProperties: function (
          clusterOptions: any,
          childNodes: any,
          childEdges: any
        ) {
          clusterOptions.label = `${childNodes.length} PDU's`;
          return clusterOptions;
        },
        clusterNodeProperties: {
          id: 'PDU Group',
          shape: 'box',
          label: "PDU's",
        },
      };
      this.visualizer.network.cluster(clusterOptionsByData);
    }
  }

  public onClusterCircuit(): void {
    if (this.visualizer.network) {
      let clusterOptionsByData = {
        joinCondition: function (childOptions: any) {
          return childOptions.group === 'cg01';
        },
        processProperties: function (
          clusterOptions: any,
          childNodes: any,
          childEdges: any
        ) {
          clusterOptions.label = `${childNodes.length} Circuits`;
          return clusterOptions;
        },
        clusterNodeProperties: {
          id: 'Circuit Group01',
          shape: 'box',
          label: 'Circuits',
        },
      };
      this.visualizer.network.cluster(clusterOptionsByData);

      clusterOptionsByData = {
        joinCondition: function (childOptions: any) {
          return childOptions.group === 'cg02';
        },
        processProperties: function (
          clusterOptions: any,
          childNodes: any,
          childEdges: any
        ) {
          clusterOptions.label = `${childNodes.length} Circuits`;
          return clusterOptions;
        },
        clusterNodeProperties: {
          id: 'Circuit Group02',
          shape: 'box',
          label: 'Circuits',
        },
      };
      this.visualizer.network.cluster(clusterOptionsByData);
    }
  }

  /**
   * Gets the options for the visualizer.
   * @returns The options to use.
   */
  private getOptions(): Options {
    return {
      physics: {
        enabled: true,
        solver: 'hierarchicalRepulsion',
        repulsion: {
          nodeDistance: 100,
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
      layout: {
        hierarchical: {
          direction: 'LR',
          sortMethod: 'directed',
        },
      },
      manipulation: {
        enabled: true,
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
