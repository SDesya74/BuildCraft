/// <reference path="../abstract/BCTransportPipe.ts" />
/// <reference path="WoodenPipeConnector.ts" />
/// <reference path="WoodenPipeTileEntity.ts" />
class PipeWooden extends BCTransportPipe {
    constructor() {
        super();
        TileEntity.registerPrototype(this.block.id, new WoodenPipeTileEntity(this.pipeRenderer, this.texture));
        EnergyTileRegistry.addEnergyTypeForId(this.block.id, RF);

        Block.registerNeighbourChangeFunctionForID(this.block.id, (coords, block, changeCoords) => {
            const tile = World.getTileEntity(coords.x, coords.y, coords.z);
            if (tile && tile.storageConnector) {
                tile.updateConnectionSide();
            }
        });

        StorageInterface.createInterface(this.block.id, {
            addItem(item, side, maxCount) {
                // * just transports items to void
                Debug.m(`items getted in addItem ${maxCount}`);
                item.count -= maxCount;
                return maxCount;
            }
        });
    }

    public get material(): string {
        return "wood"
    }

    public get pipeConnector(): PipeConnector {
        if (!this.connector) this.connector = new WoodenPipeConnector();
        return this.connector;
    }

    public get renderGroups(): { main: ICRenderGroup, addition?: ICRenderGroup } {
        return {
            main: ICRender.getGroup("BCTransportPipe"),
            addition: ICRender.getGroup("BCPipeWooden")
        };
    }

    protected get pipeTexture(): PipeTexture {
        const textre = `pipe_${this.transportType}_${this.material}`
        if (!this.texture) {
            this.texture = new PipeTexture({ name: textre, data: 0 },
                { name: textre, data: 1 },
                { name: textre, data: 2 });
        }
        return this.texture;
    }
}