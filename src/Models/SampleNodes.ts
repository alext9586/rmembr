import { Node } from './Node';

export class SampleNodes {
    public static create(repeat: Number = 1): Node[] {
        var sampleNodes: Node[] = [];

        for (var i = 0; i < repeat; i++) {
            var id = new Date();
            sampleNodes.push(
                new Node(id.toISOString(), `Sample Node ${i}`, `Notes for sample node ${i}`));
        }

        return sampleNodes;
    }
}