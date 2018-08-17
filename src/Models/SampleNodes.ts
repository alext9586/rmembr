import { Node, Connection } from './index';

export class SampleNodes {
    public static create(repeat: number = 1): Node[] {
        var sampleNodes: Node[] = [];

        for (var i = 0; i < repeat; i++) {
            const id = new Date();
            sampleNodes.push(
                new Node(i + id.toISOString(), `Sample Node ${i}`, `Notes for sample node ${i}`));
        }

        sampleNodes.forEach((node, index) => { 
            const id = new Date();
            if (index !== sampleNodes.length - 1) {
                node.addConnection(new Connection(index + id.toISOString(), sampleNodes[index+1]._id, `Connection ${index}`, `Note for connection ${index}`));
            }
        });

        return sampleNodes;
    }
}