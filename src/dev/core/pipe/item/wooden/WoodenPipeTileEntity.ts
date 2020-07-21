/// <reference path="WoodenPipeStorageConnector.ts" />
class WoodenPipeTileEntity {
    constructor(protected renderer: PipeRenderer, protected texture: PipeTexture) { }
    // * it will be rewriten during runtime
    protected data: any = {}

    protected defaultValues: any = {// * it will be rewriten during runtime
        connectionSide: null
    }

    private storageConnector: WoodenPipeStorageConnector;

    public x: number;
    public y: number;
    public z: number;

    get orientation(): number {
        if (!this.data.connectionSide) {
            this.data.connectionSide = this.getConnectionSide();
        }
        return this.data.connectionSide;
    }

    set orientation(value: number) {
        this.data.meta = value;
        this.storageConnector.connectionSide = value;
    }

    // !TileEntity event
    public tick(): void {

    }

    // !TileEntity event
    public init(): void {
        this.storageConnector = new WoodenPipeStorageConnector(this, this.renderer, this.texture);
        this.updateConnectionSide();
    }

    // !TileEntity event
    public destroy(){
        this.storageConnector.destroy();
    }

    public click(id, count, data) {
        if (id != ItemID.bc_wrench) return false;
        this.updateConnectionSide(true);
        return true;
    }

    public updateConnectionSide(findNext: boolean = false): void {
        this.storageConnector.connectionSide = this.orientation = this.getConnectionSide(findNext);
    }

    /** @param findNext - use true value if you want to rerotate pipe like a wrench */
    protected getConnectionSide(findNext: boolean = false): number | null {
        // * In common situation ends when i gets max in 5 index
        // * But if fhis function calling by wrench index can go beyound
        // * I think this code is poor, but maybe i fix it in future
        for (let t = 0; t < 12; t++) {
            const i = t % 6;

            if (findNext) {
                if (this.orientation == t) findNext = false;
                continue;
            }

            const relCoords = World.getRelativeCoords(this.x, this.y, this.z, i);
            if (this.storageConnector.canConnectTo(relCoords.x, relCoords.y, relCoords.z, i, 1)) return i;
        }
        // default value
        return null;
    }
}