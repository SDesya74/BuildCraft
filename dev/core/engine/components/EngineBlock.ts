class EngineBlock {
    public readonly id: number;
    public readonly stringId: string;

    constructor(private readonly registryId: string){
        this.stringId = "engine" + this.registryId;
        this.registerBlock();
        this.id = BlockID[this.stringId];
    }

    private registerBlock(): void {
        IDRegistry.genBlockID(this.stringId);
        Block.createBlock(this.stringId,
            [{name: this.stringId, texture: [["empty", 0]], inCreative: false}]);
    }
}